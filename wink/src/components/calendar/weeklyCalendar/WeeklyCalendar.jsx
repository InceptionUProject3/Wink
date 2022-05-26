import React, { useEffect, useState } from "react";
import moment from "moment";
import WeeklyCalendarHeader from "./WeeklyCalendarHeader";

const WeeklyCalendar = () => {
  //selectedDay is a standard day
  const [selectedDay, setSelectedDay] = useState(moment());
  const [daysInWeek, setDaysInWeek] = useState();
  useEffect(() => {
    const startDayOfWeek = selectedDay.clone().startOf("day");
    const endDayOfWeek = startDayOfWeek.clone().add(6, "days");
    //days in week should include startDayOfWeek
    const weekCalArray = [startDayOfWeek.format("DD")];
    //If you dont insert clone(), startDayOfweek will be incresed everytime in this loop.
    while (startDayOfWeek.add(1, "days").diff(endDayOfWeek) <= 0) {
      weekCalArray.push(startDayOfWeek.format("DD"));
    }
    setDaysInWeek(weekCalArray);
  }, [selectedDay]);

  return (
    <div>
      <WeeklyCalendarHeader selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      {daysInWeek?.map((day, index) => (
        <div key={`daysInWeek ${index}`}>{day}</div>
      ))}
    </div>
  );
};

export default WeeklyCalendar;
