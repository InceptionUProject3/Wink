import React, { useEffect, useState } from "react";
import moment from "moment";
import WeeklyCalendarHeader from "./WeeklyCalendarHeader";
import "./WeeklyCalendar.css";
import WeeklyCalendarBody from "./WeeklyCalendarBody";

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
    <div className="Weekly-calendar">
      <WeeklyCalendarHeader
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <div className="WeeklyCal-dates">
        {daysInWeek?.map((day, index) => (
          <div className="WeeklyCal-date" key={`daysInWeek ${index}`}>
            {day}
          </div>
        ))}
      </div>
      <WeeklyCalendarBody selectedDay={selectedDay} />
    </div>
  );
};

export default WeeklyCalendar;
