import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import WeeklyTableHeader from "./weeklyComponents/WeeklyTableHeader";
import WeeklyTableBody from "./weeklyComponents/WeeklyTableBody";
import WeeklyCalendarHeader from "./weeklyComponents/WeeklyCalendarHeader";

import { StoreContext } from "../../authentication/StoreProvider";

import "./WeeklyCalendar.css";

const WeeklyCalendar = (props) => {
  //selectedDay is a standard day
  const { selectedDay, setSelectedDay,filter } = props;
  const [daysInWeek, setDaysInWeek] = useState();

  const storeTimeZone =
    useContext(StoreContext).store?.store.timeZone || "America/New_York";
  const userTimeZone = moment.tz.guess();
  const storeOpen = moment.tz("06:00", "HH:mm", storeTimeZone).tz(userTimeZone);
  const scheduleHrs = 18;

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
      <WeeklyCalendarHeader storeOpen={storeOpen} scheduleHrs={scheduleHrs} />
      <div className="Weekly-calendar">
        <WeeklyTableHeader
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          daysInWeek={daysInWeek}
        />

        <WeeklyTableBody
          selectedDay={selectedDay}
          storeOpen={storeOpen}
          scheduleHrs={scheduleHrs}
          daysInWeek={daysInWeek}
          timezone={userTimeZone}
          filter={filter}
        />
      </div>
    </div>
  );
};

export default WeeklyCalendar;
