import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { BsCalendar2Month, BsCalendar2Week, BsCalendar2Day} from "react-icons/bs"

import MonthlyCalendar from "../../components/calendar/monthlyCalendar/monthlyCalendar";
import WeeklyCalendar from "../../components/calendar/weeklyCalendar/WeeklyCalendar";
import DailyCalendar from "../../components/calendar/dailyCalendar/DailyCalendar";

import "./calendar.css";

const Calendar = () => {
  
  return (
    <div className="Calendars-container">
      <div className="Calendar-view">
        <Routes>
          <Route path="/monthly" element={<MonthlyCalendar />} />
          <Route path="/weekly" element={<WeeklyCalendar />} />
          <Route path="/daily" element={<DailyCalendar />} />
        </Routes>
      </div>

      <div className="View-buttons">
        
        <Link to="/calendar/monthly" className="Monthly">
          
          <BsCalendar2Month/>
          M
        </Link>
        <Link to="/calendar/weekly" className="weekly">
          <BsCalendar2Week/>
          W
        </Link>
        <Link to="/calendar/daily" className="daily">
          <BsCalendar2Day/>
          D
        </Link>
      </div>
    </div>
  );
};


export default Calendar;
