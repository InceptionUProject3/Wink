import React, { useContext,  useState } from "react";
import { Route, Routes, useLocation} from "react-router-dom";
import moment from "moment";
import "moment-timezone";

import MonthlyCalendar from "../../components/calendar/monthlyCalendar/MonthlyCalendar";
import WeeklyCalendar from "../../components/calendar/weeklyCalendar/WeeklyCalendar";
import DailyCalendar from "../../components/calendar/dailyCalendar/DailyCalendar";

import ViewButtons from "../../components/Reusables/components/ViewButtons";
import TodayButton from "../../components/Reusables/components/TodayButton";
import RequestSwapBtn from "../../components/Reusables/components/RequestSwapBtn";
import { StoreContext } from "../../components/authentication/StoreProvider";
import SwapShiftRequest from "../../components/shiftSwapRequest/SwapShiftRequest";
import WeeklyFilters from "../../components/calendar/weeklyCalendar/WeeklyFilters";

import "./calendar.css";

const Calendar = () => {
  const [filter, setFilter] = useState("All");
  const filterList = ["All", "My Position", "Working"];
// console.log("filter in calendar", filter)
  const [selectedDay, setSelectedDay] = useState(moment());
  const [openModal, setOpenModal] = useState(false);

  const calendar = useLocation()?.pathname.split('/').pop();
  console.log("calendar", calendar)
  const storeTimeZone =
    useContext(StoreContext).store?.store.timeZone || "America/New_York";
  const userTimeZone = moment.tz.guess();
  //  console.log(userTimeZone)
  const [settingHrsObj, setSettingHrsObj] = useState({
    startTimeOfDay: moment.tz("06:00", "HH:mm", storeTimeZone).tz(userTimeZone), scheduleHrs: 18
  });
  // const storeOpen = moment.tz("06:00", "HH:mm", storeTimeZone).tz(userTimeZone);
  // const scheduleHrs = 18;

  return (
    <div className="Calendars">
      <div className="Calendars-container">
        <div className="Calendar-header">
          <RequestSwapBtn setOpenModal={setOpenModal} />
          {calendar==="weekly"&&<WeeklyFilters filter={filter} setFilter={setFilter} filterList={filterList} />}
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
                  scheduleHrs={settingHrsObj.scheduleHrs}
                  timezone={userTimeZone}
                />
              }
            />
            <Route
              path="/weekly"
              element={
                <WeeklyCalendar
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  settingHrsObj={settingHrsObj}
                  filter={filter}
                  timeZone={userTimeZone}
                />
              }
            />

            <Route
              path="/daily"
              element={
                <DailyCalendar
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  settingHrsObj={settingHrsObj}
                  timeZone={userTimeZone}
                />
              }
            />
          </Routes>
        </div>
      </div>
      {openModal && (
        <div className="Side-modal-container">
          <SwapShiftRequest setOpenModal={setOpenModal} />
        </div>
      )}
    </div>
  );
};

export default Calendar;
