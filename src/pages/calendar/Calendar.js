import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import moment from "moment";
import "moment-timezone";

import MonthlyCalendar from "../../components/calendar/monthlyCalendar/MonthlyCalendar";
import WeeklyCalendar from "../../components/calendar/weeklyCalendar/WeeklyCalendar";
import DailyCalendar from "../../components/calendar/dailyCalendar/DailyCalendar";

import "./calendar.css";
import ViewButtons from "../../components/calendar/Reusables/components/ViewButtons";
import TodayButton from "../../components/calendar/Reusables/components/TodayButton";
import { StoreContext } from "../../components/authentication/StoreProvider";

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(moment());

  const storeTimeZone =
    useContext(StoreContext).store?.store.timeZone || "America/New_York";
  const userTimeZone = moment.tz.guess();
  //  console.log(userTimeZone)
  const storeOpen = moment.tz("06:00", "HH:mm", storeTimeZone).tz(userTimeZone);
  const scheduleHrs = 18;

  return (
    <div className="Calendars-container">
      <div className="Calendar-header">
        <ViewButtons />
        <TodayButton setSelectedDay={setSelectedDay} />
      </div>
      <div className="Calendar-view">
        <Routes>
          <Route path="/monthly" element={<MonthlyCalendar />} />
          <Route
            path="/weekly"
            element={
              <WeeklyCalendar
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                storeOpen={storeOpen}
                scheduleHrs={scheduleHrs}
              />
            }
          />
          <Route
            path="/daily"
            element={
              <DailyCalendar
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                storeOpen={storeOpen}
                scheduleHrs={scheduleHrs}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Calendar;
