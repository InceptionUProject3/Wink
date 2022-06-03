import React, { useEffect, useState } from "react";
import moment from "moment";
import WeeklyTableHeader from "./WeeklyTableHeader";
import "./WeeklyCalendar.css";
import WeeklyCalendarBody from "./WeeklyTableBody";
import WeeklyCalendarHeader from "./WeeklyCalendarHeader";

const WeeklyCalendar = () => {
  //selectedDay is a standard day
  const [selectedDay, setSelectedDay] = useState(moment());
  const [daysInWeek, setDaysInWeek] = useState();

  //need to fetch store information
  const storeOpen = moment("09:00", "HH:mm");
  // console.log("storeStart", storeOpen)
  const storeClose = moment("20:00", "HH:mm");

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
      
    <WeeklyCalendarHeader storeOpen={storeOpen} storeClose={storeClose}/>
      <div className="Weekly-calendar">
        <WeeklyTableHeader
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          daysInWeek={daysInWeek}
        />
        
        <WeeklyCalendarBody
          selectedDay={selectedDay}
          storeOpen={storeOpen}
          storeClose={storeClose}
        />
      </div>
    </div>
  );
};

export default WeeklyCalendar;
