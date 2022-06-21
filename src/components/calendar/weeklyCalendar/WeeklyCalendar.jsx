import React, { useContext, useEffect, useState } from "react";
import WeeklyTableHeader from "./WeeklyTableHeader";
import WeeklyCalendarBody from "./WeeklyTableBody";
import WeeklyCalendarHeader from "./WeeklyCalendarHeader";
import "./WeeklyCalendar.css";
import moment from "moment";
import { StoreContext } from "../../authentication/StoreProvider";

const WeeklyCalendar = (props) => {
  //selectedDay is a standard day
  const { selectedDay, setSelectedDay } = props;
  const [daysInWeek, setDaysInWeek] = useState();

  const storeTimeZone =
    useContext(StoreContext).store?.store.timeZone || "America/New_York";
  const userTimeZone = moment.tz.guess();
  //  console.log(userTimeZone)
  const storeOpen = moment.tz("06:00", "HH:mm", storeTimeZone).tz(userTimeZone);
  const scheduleHrs = 18;

  useEffect(() => {
    const startDayOfWeek = selectedDay?.clone().startOf("week");
    const endDayOfWeek = selectedDay?.clone().endOf("week");
    // console.log('start day', startDayOfWeek.format('YYYY-MM-DD HH:mmZ'))
    //days in week should include startDayOfWeek
    const weekCalArray = [startDayOfWeek?.format()];
    //If you dont insert clone(), startDayOfweek will be incresed everytime in this loop.
    while (startDayOfWeek?.add(1, "days").diff(endDayOfWeek) <= 0) {
      weekCalArray.push(startDayOfWeek?.format());
    }
    // console.log(weekCalArray);
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

        <WeeklyCalendarBody
          selectedDay={selectedDay}
          storeOpen={storeOpen}
          scheduleHrs={scheduleHrs}
        />
      </div>
    </div>
  );
};

export default WeeklyCalendar;
