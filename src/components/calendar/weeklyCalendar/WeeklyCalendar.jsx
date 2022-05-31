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
    const weekCalArray = [startDayOfWeek.format()];
    //If you dont insert clone(), startDayOfweek will be incresed everytime in this loop.
    while (startDayOfWeek.add(1, "days").diff(endDayOfWeek) <= 0) {
      weekCalArray.push(startDayOfWeek.format());
    }
    console.log(weekCalArray);
    setDaysInWeek(weekCalArray);
  }, [selectedDay]);

  return (
    <div className="Weekly-calendar-container">
    <div className="Weekly-calendar">
      <WeeklyCalendarHeader
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <>
        {daysInWeek?.map((day, index) => {
          const isWeekend =
          moment(day).day() === 0||moment(day).day()===6 ? "Weekend" : "";
          const isToday =
            day === moment().startOf("day").format() ? "Today" : "";
            console.log("isWeekend", moment(day).day());

          return (
            <div
              className={`WeeklyCal-date ${isToday} ${isWeekend}`}
              key={`daysInWeek ${index}`}
            >
              {moment(day).format("ddd DD")}
            </div>
          );
        })}
      </>
      <WeeklyCalendarBody selectedDay={selectedDay} />
    </div>
    </div>
  );
};

export default WeeklyCalendar;
