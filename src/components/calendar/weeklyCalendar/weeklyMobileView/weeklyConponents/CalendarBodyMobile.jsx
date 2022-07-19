import React, { useEffect, useContext, useState } from "react";
import setPositionList from "../../../../Reusables/functions/setPositionList";
import { LoginContext } from "../../../../authentication/LoginProvider";
import { StoreContext } from "../../../../authentication/StoreProvider";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ProfileIcon } from "../../../../Reusables/components/ProfileIcon";
import calculateWeekHrs from "../../../../Reusables/functions/calculateWeekHrs"
import findDaySchedule from "../../../../Reusables/functions/findDaySchedule";
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
  // const [workDaySched, setWorkDaySched] = useState([]);
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
          scheduleData?.myAllSchedules[0]?.schedules
        );
        setMyWorkRawSched(() => scheduleData?.myAllSchedules[0]?.schedules?.workScheds);
        setMyVacSched(() => scheduleData?.myAllSchedules[0]?.schedules?.vacScheds);
        const todayData = scheduleData?.myTodayWorkSched[0];
        setTodayWorkSched(() => {
          return {
            ...todayData?.schedules[0],
            availHrs: todayData?.availability.availHrsinWeek,
            firstname: todayData?.firstname,
            lastname: todayData?.lastname,
            position: todayData?.position,
            starttime: moment.tz(todayData?.schedules[0].starttime, timezone),
            endtime: moment.tz(todayData?.schedules[0].endtime, timezone),
          };
        });

        const positionArray = setPositionList(todayData?.schedules);
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
    const scheduleArray = findDaySchedule(daysInWeek,myWorkRawSched, timezone, settingHrsObj);
  //  console.log('shceudle array', scheduleArray)
    setMyWorkSched(scheduleArray);
  }, [daysInWeek, settingHrsObj, myWorkRawSched, timezone]);

  const goToDaily = (day) => {
    // console.log("day", day);
    setSelectedDay(day);
    navigate("/calendar/daily", { replace: true });
  };

  return (
    <div className="Cards_container">
      <div className="Summary_card">
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
            {calculateWeekHrs(myWorkRawSched?.workScheds)}/{todayWorkSched?.availHrs || 0} hrs
          </div>
        </div>
      
      </div>
    
      <div className="Schedule">
        <div className="title">Weekly Schedules</div>

        {myWorkSched?.some(sched=>sched.schedule===true)? (
          myWorkSched?.map((sched, i) => {
            
            if (sched.schedule) {
              console.log("sched", sched);
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
                 
                </div>
               
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
