import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import moment from "moment";

import MonthlyCalendar from "../../components/calendar/monthlyCalendar/monthlyCalendar";
import WeeklyCalendar from "../../components/calendar/weeklyCalendar/WeeklyCalendar";
import DailyCalendar from "../../components/calendar/dailyCalendar/DailyCalendar";

import "./calendar.css";
import ViewButtons from "../../components/calendar/Reusables/components/ViewButtons";
import TodayButton from "../../components/calendar/Reusables/components/TodayButton";

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(moment());

  // console.log("selected calendar", typeof selectedCal);
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
              />
            }
          />
          <Route
            path="/daily"
            element={<DailyCalendar selectedDay={selectedDay} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Calendar;
