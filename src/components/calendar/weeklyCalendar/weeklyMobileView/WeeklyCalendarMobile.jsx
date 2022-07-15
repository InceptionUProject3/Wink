import React, { useContext, useEffect, useState } from "react";

// import { StoreContext } from "../../authentication/StoreProvider";
import HeaderMobile from "./weeklyConponents/HeaderMobile";

import "./weeklyCalendarMobile.css";
import CalendarBodyMobile from "./weeklyConponents/CalendarBodyMobile";

const WeeklyCalendarMobile = (props) => {
  //selectedDay is a standard day
  const { selectedDay, setSelectedDay, timeZone, settingHrsObj } = props;
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
    <div className="Weekly-calendar-container-mobile">
      {/* <div className="Weekly-calendar-mobile"> */}
      <HeaderMobile
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        daysInWeek={daysInWeek}
        timezone={timeZone}
      />
      
      <CalendarBodyMobile
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        daysInWeek={daysInWeek}
        timezone={timeZone}
        settingHrsObj={settingHrsObj}
      />
      {/* <WeeklyTableHeader
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          daysInWeek={daysInWeek}
        /> */}

      {/* <WeeklyTableBody
          selectedDay={selectedDay}
          settingHrsObj={settingHrsObj}
          daysInWeek={daysInWeek}
          timezone={timeZone}
          filter={filter}
        /> */}
      {/* </div> */}
    </div>
  );
};

export default WeeklyCalendarMobile;
