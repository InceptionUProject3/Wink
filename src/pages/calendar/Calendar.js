import React, { useContext, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import moment from "moment";
import "moment-timezone";

import MonthlyCalendar from "../../components/calendar/monthlyCalendar/MonthlyCalendar";
import WeeklyCalendar from "../../components/calendar/weeklyCalendar/WeeklyCalendar";
import DailyCalendar from "../../components/calendar/dailyCalendar/DailyCalendar";

import "./calendar.css";
import ViewButtons from "../../components/calendar/Reusables/components/ViewButtons";
import TodayButton from "../../components/calendar/Reusables/components/TodayButton";
import RequestSwapBtn from "../../components/calendar/Reusables/components/RequestSwapBtn";
import { StoreContext } from "../../components/authentication/StoreProvider";
import SwapShiftModal from "../../components/calendar/shiftSwapModal/SwapShiftModal";
import WeeklyFilters from "../../components/calendar/weeklyCalendar/WeeklyFilters";


const Calendar = () => {
  const [filter, setFilter] = useState("All"
    //[
    // { name: "All", boolean: true },
    // { name: "My Position", boolean: false },
    // { name: "Working", boolean: false },
  //]
  );
  const filterList = ["All", "My Position", "Working"];
console.log("filter in calendar", filter)
  const [selectedDay, setSelectedDay] = useState(moment());
  const [openModal, setOpenModal] = useState(false);

  const storeTimeZone =
    useContext(StoreContext).store?.store.timeZone || "America/New_York";
  const userTimeZone = moment.tz.guess();
  //  console.log(userTimeZone)
  const storeOpen = moment.tz("06:00", "HH:mm", storeTimeZone).tz(userTimeZone);
  const scheduleHrs = 18;

  return (
    <div className="Calendars">
      <div className="Calendars-container">
        <div className="Calendar-header">
          <RequestSwapBtn setOpenModal={setOpenModal} />
          <WeeklyFilters filter={filter} setFilter={setFilter} filterList={filterList} />
          <ViewButtons />
          <TodayButton setSelectedDay={setSelectedDay} />
        </div>
        <div className="Calendar-view">
          <Routes>
            <Route
              path="/monthly"
              element={
                <MonthlyCalendar
                  today={selectedDay}
                  setToday={setSelectedDay}
                  scheduleHrs={scheduleHrs}
                />
              }
            />
            <Route
              path="/weekly"
              element={
                <WeeklyCalendar
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  storeOpen={storeOpen}
                  scheduleHrs={scheduleHrs}
                  filter={filter}
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
      {openModal && (
        <div className="Side-modal-container">
          <SwapShiftModal setOpenModal={setOpenModal} />
        </div>
      )}
    </div>
  );
};

export default Calendar;
