import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { BsCalendar } from "react-icons/bs";
import moment from "moment";


import MonthlyCalendar from "../../components/calendar/monthlyCalendar/monthlyCalendar";
import WeeklyCalendar from "../../components/calendar/weeklyCalendar/WeeklyCalendar";
import DailyCalendar from "../../components/calendar/dailyCalendar/DailyCalendar";

import "./calendar.css";

const Calendar = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(moment());
  const [selectedCal, setSelectedCal] = useState("monthly ");

  const setToToday = () => {
    const today = moment();
    setSelectedDay(today);
  };
  const buttonActive = (e) => {
    const clicked = e.currentTarget.className;
    return setSelectedCal(clicked);
  };
  // console.log("selected calendar", typeof selectedCal);
  return (
    <div className="Calendars-container">
      <div className="Calendar-header">
        <div className="View-buttons">
          <button
            className={`monthly ${
              selectedCal === "monthly " ? "selected" : ""
            }`}
            onClick={(e) => {
              navigate("/calendar/monthly");
              buttonActive(e);
            }}
          >
            <BsCalendar />
            <p>M</p>
          </button>
          <button
            className={`weekly ${selectedCal === "weekly " ? "selected" : ""}`}
            onClick={(e) => {
              navigate("/calendar/weekly");
              buttonActive(e);
            }}
          >
            <BsCalendar />
            <p>W</p>
          </button>
          <button
            className={`daily ${selectedCal === "daily " ? "selected" : ""}`}
            onClick={(e) => {
              navigate("/calendar/daily");
              buttonActive(e);
            }}
          >
            <BsCalendar />
            <p>D</p>
          </button>
        </div>
        <button className="today" onClick={setToToday}>
          Today
        </button>
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
