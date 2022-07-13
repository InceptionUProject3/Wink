import React, { useEffect, useContext, useState } from "react";
import setPositionList from "../../../../Reusables/functions/setPositionList";
import { LoginContext } from "../../../../authentication/LoginProvider";
import { StoreContext } from "../../../../authentication/StoreProvider";
import moment from "moment";

const CalendarBodyMobile = ({
  selectedDay,
  daysInWeek,
  timezone,
  settingHrsObj,
}) => {
  const userId = useContext(LoginContext).user?.id || 9;
  const storeId = useContext(StoreContext).store?.Store_idStore || 1;

  const [mySched, setMySched] = useState();
  //set schdules & position colors
  useEffect(() => {
    console.log("fetching useEffect");
    const getMySchedules = async () => {
      try {
        console.log("selectedDay", selectedDay);
        const startDay = selectedDay?.clone().startOf("week");
        //need to fetch schedule with priod from server
        const weekStart = startDay?.clone().format();
        const res = await fetch(
          `/api/schedule/weekly/onlyMine/?storeId=${storeId}&userId=${userId}&startDay=${weekStart}`
        );
        const scheduleData = await res.json();
        console.log("fetched my schedules", scheduleData.mySchedules);
        setMySched(() => scheduleData.mySchedules[0].schedules);
      } catch (err) {
        console.log("Failed to fetch schedule data", err);
        setMySched(() => null);
      }
    };
    selectedDay && getMySchedules();
  }, [selectedDay, storeId]);

  return (
    <div className="Cards_container">
      <div className="Schedule">
        <div className="title">Schedules</div>

        {mySched ? (
          daysInWeek?.map((day, i) => {
            //need to change to store hrs
            const oneDay = moment.tz(day, timezone);
            const dayStart = oneDay.clone().set({
              h: settingHrsObj?.startTimeOfDay?.hour(),
              m: settingHrsObj?.startTimeOfDay?.minute(),
            });
            const dayEnd = dayStart
              .clone()
              .add(settingHrsObj?.scheduleHrs, "hours");

            const foundSched = mySched?.find(
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
                Math.round((moment(newTo - newFrom).unix() / 60 / 60) * 100) /
                100;
              return (
                foundSched.workcode === 0 && (
                  <div
                    key={`Sched ${mySched?.scheduleId} ${i}`}
                    className="card"
                  >
                    <div className="first-column">
                      <div className="day">{oneDay.format("ddd")},</div>
                      <div className="date">{oneDay.format("Do")}</div>
                    </div>
                    <div className="second-column">
                      <div className="card_text">
                        {newFrom?.format("h:mma")}-{newTo?.format("h:mma")}
                      </div>
                      <div className="hours">{hrs}hrs</div>
                    </div>
                  </div>
                )
              );
            }
          })
        ) : (
          <div className="message">No schedules found</div>
        )}
      </div>
    </div>
  );
};

export default CalendarBodyMobile;
