import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../authentication/StoreProvider";
// import WeeklyCalendar from "../../calendar/weeklyCalendar/WeeklyCalendar";
import WeeklyCalendarHeader from "../../calendar/weeklyCalendar/WeeklyCalendarHeader";
import DisplayOthersSched from "../../calendar/weeklyCalendar/weeklyTableBody/DisplayOthersSched";
// import WeeklyTableBody from "../../calendar/weeklyCalendar/WeeklyTableBody";

import "./schedule.css";
import ScheduleTableHeader from "./ScheduleTableHeader";

const Schedule = (props) => {
  const { selectedDay, scheduleHrs, storeOpen, schedules, positions } = props;
  const storeTimeZone =
    useContext(StoreContext).store?.store.timeZone || "America/New_York";
  const endDayOfWeek = selectedDay?.clone().endOf("week");
  const storeClose = storeOpen?.clone().add(scheduleHrs, "hours");

  const [daysInWeek, setDaysInWeek] = useState();

  useEffect(() => {
    const weekArray = [];
    for (let i = 0; i < endDayOfWeek?.diff(selectedDay, "days") + 1; i++) {
      weekArray.push(selectedDay?.clone().add(i, "days").format());
    }
    return setDaysInWeek(weekArray);
  }, [selectedDay]);

  // console.log("daysInweek", daysInWeek);

  return (
    <div>
      <WeeklyCalendarHeader storeOpen={storeOpen} scheduleHrs={scheduleHrs} />
      <div className="Admin-weekly-calendar">
        <div className="Weekly-header">
          <ScheduleTableHeader
            selectedDay={selectedDay}
            endDayOfWeek={endDayOfWeek}
            daysInWeek={daysInWeek}
          />
        </div>
        <div className="Schedules">
          {schedules && (
            <DisplayOthersSched
              cowokerProfs={schedules}
              positions={positions}
              daysInWeek={daysInWeek}
              storeOpen={storeOpen}
              storeClose={storeClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
