import React, { useEffect, useState } from "react";
// import WeeklyCalendar from "../../calendar/weeklyCalendar/WeeklyCalendar";
import WeeklyCalendarHeader from "../../calendar/weeklyCalendar/WeeklyCalendarHeader";
// import WeeklyTableBody from "../../calendar/weeklyCalendar/WeeklyTableBody";

import './schedule.css'

const Schedule = (props) => {
  const { selectedDay, scheduleHrs, storeOpen, schedules, positions } = props;
  const [daysInWeek, setDaysInWeek]= useState();
  useEffect(() => {
    const endDayOfWeek = selectedDay?.clone().endOf("week");
    const weekArray = [];
    for (let i = 0; i < endDayOfWeek?.diff(selectedDay, "days") + 1; i++) {
      weekArray.push(selectedDay?.clone().add(i, "days").format());
    }
    return setDaysInWeek(weekArray);
  }, [selectedDay]);
 
  console.log('daysInweek', daysInWeek);

  return (
    <div>
      <WeeklyCalendarHeader storeOpen={storeOpen} scheduleHrs={scheduleHrs} />
      
    </div>
  );
};

export default Schedule;
