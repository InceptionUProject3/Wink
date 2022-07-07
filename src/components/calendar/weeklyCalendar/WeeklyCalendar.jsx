import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import WeeklyTableHeader from "./weeklyComponents/WeeklyTableHeader";
import WeeklyTableBody from "./weeklyComponents/WeeklyTableBody";
import WeeklyCalendarHeader from "./weeklyComponents/WeeklyCalendarHeader";

import { StoreContext } from "../../authentication/StoreProvider";

import "./WeeklyCalendar.css";

const WeeklyCalendar = (props) => {
  //selectedDay is a standard day
  const { selectedDay, setSelectedDay,filter,settingHrsObj, timeZone } = props;
  const [daysInWeek, setDaysInWeek] = useState();

  useEffect(() => {
    const startDayOfWeek = selectedDay?.clone().startOf("week");
    const endDayOfWeek = selectedDay?.clone().endOf("week");
    const weekCalArray = [startDayOfWeek?.format()];
    while (startDayOfWeek?.add(1, "days").diff(endDayOfWeek) <= 0) {
      weekCalArray.push(startDayOfWeek?.format());
    }
    setDaysInWeek(weekCalArray);
  }, [selectedDay]);

  return (
    <div className="Weekly-calendar-container">
      <WeeklyCalendarHeader settingHrsObj={settingHrsObj} />
      <div className="Weekly-calendar">
        <WeeklyTableHeader
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          daysInWeek={daysInWeek}
        />

        <WeeklyTableBody
          selectedDay={selectedDay}
          settingHrsObj={settingHrsObj}
          daysInWeek={daysInWeek}
          timezone={timeZone}
          filter={filter}
        />
      </div>
    </div>
  );
};

export default WeeklyCalendar;
