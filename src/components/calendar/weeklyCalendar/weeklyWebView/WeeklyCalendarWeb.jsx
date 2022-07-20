import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import WeeklyTableHeader from "./weeklyComponents/WeeklyTableHeader";
import WeeklyTableBody from "./weeklyComponents/WeeklyTableBody";
import WeeklyCalendarHeader from "../../../Reusables/components/CalendarHeaderInfo";

// import { StoreContext } from "../../authentication/StoreProvider";

import "./WeeklyCalendar.css";
import DisplayDaysinWeek from "../../../Reusables/components/DisplayDaysinWeek";

const WeeklyCalendarWeb = (props) => {
  //selectedDay is a standard day
  const { selectedDay, setSelectedDay,filter,settingHrsObj, timeZone ,openModal} = props;

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
        />
        <DisplayDaysinWeek daysInWeek={daysInWeek} timezone={timeZone} />
        <WeeklyTableBody
          selectedDay={selectedDay}
          settingHrsObj={settingHrsObj}
          daysInWeek={daysInWeek}
          timezone={timeZone}
          filter={filter}
          openModal={openModal}
        />
      </div>
    </div>
  );
};

export default WeeklyCalendarWeb;
