import React from "react";
import moment from "moment";
import ScheduleBar from "../../../../Reusables/components/ScheduleBar";

const WeeklySchedBar = ({
  daysInWeek,
  storeOpen,
  scheduleHrs,
  schedules,
  timezone,
}) => {
  // const timezone = "America/New_York";

  // console.log("all", daysInWeek, storeOpen, timezone, schedules);
  return daysInWeek?.map((day, i) => {
    //need to change to store hrs
    const oneDay = moment.tz(day, timezone);
    const dayStart = oneDay
      .clone()
      .set({ h: storeOpen?.hour(), m: storeOpen?.minute() });
    const dayEnd = dayStart.clone().add(scheduleHrs, "hours");

    const foundSched = schedules?.find(
      (sched) =>
        moment.tz(sched.endtime, timezone) > dayStart &&
        moment.tz(sched.starttime, timezone) < dayEnd
    );
    
    if (foundSched === undefined) {
      return (
        <div
        className="Schedule"
        key={`emptySched ${schedules?.scheduleId} ${i}`}
        ></div>
        );
      } else if (foundSched) {
        const schedFrom = moment.tz(foundSched.starttime,timezone);
        const schedTo = moment.tz(foundSched.endtime,timezone);
        const newFrom = schedFrom > dayStart ? schedFrom : dayStart;
        const newTo = schedTo < dayEnd ? schedTo : dayEnd;
        // console.log("foundSched", schedFrom, schedTo, dayStart, dayEnd);

      return (
        <div key={`Sched ${schedules?.scheduleId} ${i}`} className="Schedule">
          <ScheduleBar
            dayStart={dayStart}
            dayEnd={dayEnd}
            newFrom={newFrom}
            newTo={newTo}
            schedObj={foundSched}
            timezone={timezone}
          />
          {foundSched.workcode === 0 && (
            <div className="text">
              {newFrom?.format("h:mma")}-{newTo?.format("h:mma")}
            </div>
          )}
        </div>
      );
    }
  });
};

export default WeeklySchedBar;
