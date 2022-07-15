import React, { useEffect, useContext, useState } from "react";
import setPositionList from "../../../../Reusables/functions/setPositionList";
import { LoginContext } from "../../../../authentication/LoginProvider";
import { StoreContext } from "../../../../authentication/StoreProvider";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ProfileSmall from "../../../../Reusables/components/ProfileSmall";
import { ProfileIcon } from "../../../../Reusables/components/ProfileIcon";
import calculateWeekHrs from "../../../../Reusables/functions/calculateWeekHrs"
const CalendarBodyMobile = ({
  selectedDay,
  daysInWeek,
  timezone,
  settingHrsObj,
  setSelectedDay,
}) => {
  const navigate = useNavigate();
  const userId = useContext(LoginContext).user?.id || 9;
  const storeId = useContext(StoreContext).store?.Store_idStore || 1;

  const [myWorkRawSched, setMyWorkRawSched]=useState();
  const [myWorkSched, setMyWorkSched] = useState();
  const [myVacSched, setMyVacSched] = useState();
  const [workDaySched, setWorkDaySched] = useState([]);
  const [todayWorkSched, setTodayWorkSched] = useState();
  const [position, setPosition] = useState();
  //set schdules & position colors
  useEffect(() => {
    // console.log("fetching useEffect");
    const getMySchedules = async () => {
      try {
        // console.log("selectedDay", selectedDay);
        const startDay = selectedDay?.clone().startOf("week");
        //need to fetch schedule with priod from server
        const weekStart = startDay?.clone().format();
        const res = await fetch(
          `/api/schedule/weekly/onlyMine/?storeId=${storeId}&userId=${userId}&startDay=${weekStart}`
        );
        const scheduleData = await res.json();
        console.log(
          "fetched my schedules",
          scheduleData.myWorkSched,
          scheduleData.myVacSched
        );
        setMyWorkRawSched(() => scheduleData.myWorkSched[0].schedules);
        setMyVacSched(() => scheduleData.myVacSched[0].schedules);
        const todayData = scheduleData.myTodayWorkSched[0];
        setTodayWorkSched(() => {
          return {
            ...todayData.schedules[0],
            availHrs: todayData.availability.availHrsinWeek,
            firstname: todayData.firstname,
            lastname: todayData.lastname,
            position: todayData.position,
            starttime: moment.tz(todayData.schedules[0].starttime, timezone),
            endtime: moment.tz(todayData.schedules[0].endtime, timezone),
          };
        });

        const positionArray = setPositionList(scheduleData.myWorkSched);
        setPosition(() => positionArray[0]);
      } catch (err) {
        console.log("Failed to fetch schedule data", err);
        setMyWorkSched(() => null);
      }
    };
    selectedDay && getMySchedules();
  }, [selectedDay, storeId, userId]);

  //set schedule data array to be displayed
  useEffect(() => {
    const findDaySchedule = () => {
      // setTodayWorkSched();
      const daySchedArray = [];
      daysInWeek?.map((day) => {
        // const today = moment().format("YYYY-MM-DD");
        const oneDay = moment.tz(day, timezone);
        const dayStart = oneDay.clone().set({
          h: settingHrsObj?.startTimeOfDay?.hour(),
          m: settingHrsObj?.startTimeOfDay?.minute(),
        });
        const dayEnd = dayStart
          .clone()
          .add(settingHrsObj?.scheduleHrs, "hours");

        const foundSched = myWorkRawSched?.find(
          (sched) =>
            moment.tz(sched.endtime, timezone) > dayStart &&
            moment.tz(sched.starttime, timezone) < dayEnd
        );
        if (foundSched) {
          const schedFrom = moment.tz(foundSched.starttime, timezone);
          // console.log("found", foundSched.starttime, schedFrom)
          const schedTo = moment.tz(foundSched.endtime, timezone);
          const newFrom = schedFrom > dayStart ? schedFrom : dayStart;
          const newTo = schedTo < dayEnd ? schedTo : dayEnd;
          // console.log("foundSched", schedFrom, schedTo, dayStart, dayEnd);
          const hrs =
            Math.round((moment(newTo - newFrom).unix() / 60 / 60) * 100) / 100;

          //Take today schedule to be displayed on the top.
          // if (moment(oneDay.format("YYYY-MM-DD")).isSame(today)) {
          //setTodayWorkSched((pre)=>{ return{...pre, day: oneDay, newFrom, newTo, hrs }});
          // }
          return daySchedArray.push({ day: oneDay, newFrom, newTo, hrs });
        } else {
          return daySchedArray.push({
            day: oneDay,
            newFrom: null,
            newTo: null,
            hrs: null,
          });
        }
      });
      // console.log("work array", daySchedArray);
      return setWorkDaySched(daySchedArray);
    };
    findDaySchedule();
  }, [daysInWeek, settingHrsObj, myWorkRawSched, timezone]);

  const goToDaily = (day) => {
    // console.log("day", day);
    setSelectedDay(day);
    navigate("/calendar/daily", { replace: true });
  };

  // // console.log("nul?", todayWorkSched, position);
  // const calcHrsinWeek = () => {
  //   return 0;
  // };

  return (
    <div className="Cards_container">
      <div className="Summary_card">
        {/* <div className="card"> */}
        <div className="position">
          <ProfileIcon profile={todayWorkSched} color={position?.color} />
          <div className="name">
            {todayWorkSched?.firstname}, {todayWorkSched?.lastname}
          </div>
        </div>
        <div className="row">
          <div className="label">Today :</div>&nbsp;
          {todayWorkSched ? (
            <div className="Today-sched">
              {todayWorkSched.starttime?.format("h:mma")}&nbsp;~&nbsp;
              {todayWorkSched.endtime?.format("h:mma (z)")}
            </div>
          ) : (
            <div className="Today-sched">Day off</div>
          )}
        </div>
        <div className="row">
          <div className="label">Scheduled Hrs : </div>&nbsp;
          <div className="scheduled-Hrs">
            {calculateWeekHrs(myWorkRawSched)}/{todayWorkSched?.availHrs || 0} hrs
          </div>
        </div>
        {/* <ProfileSmall emp={todayWorkSched} position={position} index={0}/> */}
        {/* <ProfileSmall emp, position, i, index,calcHrsinWeek,schedHrsinWeek/> */}
        {/* </div> */}
      </div>
      {/* {todayWorkSched&& ( */}
      {/* <div className="Schedule">
        <div className="title-today">Today Schedule</div>
          <div className="card">
            <div className="first-column">
              <div className="deco-circle"></div>
              <div className="day">{todayWorkSched.day.format("ddd")},</div>
              <div className="date">{todayWorkSched.day.format("Do")}</div>
            </div>
            <div className="second-column">
              <div className="card_text">
                {todayWorkSched.newFrom?.format("h:mma")}&nbsp;~&nbsp;
                {todayWorkSched.newTo?.format("h:mma (z)")}
              </div>
              <div className="hours">{todayWorkSched.hrs}hrs</div>
            </div>
          </div>
      </div> */}
      {/* )} */}
      <div className="Schedule">
        <div className="title">Weekly Schedules</div>

        {myWorkSched?.length !== 0 ? (
          workDaySched?.map((sched, i) => {
            if (sched.hrs !== 0 && sched.hrs !== null) {
              // console.log("sched", sched);
              return (
                <div
                  key={`Sched ${myWorkSched?.scheduleId} ${i}`}
                  className="card"
                  onClick={() => goToDaily(sched.day)}
                >
                  <div className="first-column">
                    <div className="day">{sched.day.format("ddd")},</div>
                    <div className="date">{sched.day.format("Do")}</div>
                  </div>
                  <div className="second-column">
                    <div className="card_text">
                      {sched.newFrom?.format("h:mma")}&nbsp;~&nbsp;
                      {sched.newTo?.format("h:mma (z)")}
                    </div>
                    <div className="hours">{sched.hrs}hrs</div>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div className="no-message">No schedules found</div>
        )}
      </div>
      <div className="Schedule">
        <div className="title">Vacation</div>
        {myVacSched?.length !== 0 ? (
          myVacSched?.map((sched, i) => {
            const startDay = moment.tz(sched.starttime, timezone);
            const endDay = moment.tz(sched.endtime, timezone);
            console.log("start and end date", startDay, endDay);
            return (
              <div
                key={`Sched ${myWorkSched?.scheduleId} ${i}`}
                className="card-vac"
              >
                <div className="first-row">
                  <div className="day">
                    <span className="text-highlight">
                      {startDay.format("ddd,")}
                    </span>
                    <span>{startDay.format("Do")}</span>
                  </div>
                  &nbsp;~&nbsp;
                  <div className="date">
                    <span className="text-highlight">
                      {endDay.format("ddd,")}
                    </span>
                    <span>{endDay.format("Do")}</span>
                  </div>
                  {/* <div className="date">{endDay.format("ddd, Do")}</div> */}
                </div>
                {/* <div className="second-row"> */}
                {/* <div className="card_text">
                      {newFrom?.format("h:mma")}-{newTo?.format("h:mma")}
                    </div>
                    <div className="hours">{hrs}hrs</div> */}
                {/* </div> */}
              </div>
            );
          })
        ) : (
          <div className="no-message">No vacation schedules found</div>
        )}
      </div>
    </div>
  );
};

export default CalendarBodyMobile;
