import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../authentication/StoreProvider";
import WeeklyCalendarHeader from "../../calendar/weeklyCalendar/WeeklyCalendarHeader";
import ClickableSchedules from "./scheduleTableBody/ClickableSchedules";

import "./schedule.css";
import ScheduleTableHeader from "./ScheduleTableHeader";

const Schedule = (props) => {
  const {
    selectedDay,
    scheduleHrs,
    storeOpen,
    schedules,
    positions,
    filters,
    selectedEmp,
    setSchedModalOpen,
    selectedDate,
    setSelectedDate,
    selectedSched,
    setSelectedSched,
  } = props;
  const storeTimeZone =
    useContext(StoreContext).store?.store.timeZone || "America/New_York";
  const endDayOfWeek = selectedDay?.clone().endOf("week");
  // const storeClose = storeOpen?.clone().add(scheduleHrs, "hours");
  const [daysInWeek, setDaysInWeek] = useState();
  // console.log('schedules', schedules);
  useEffect(() => {
    const weekArray = [];
    for (let i = 0; i < endDayOfWeek?.diff(selectedDay, "days") + 1; i++) {
      weekArray.push(selectedDay?.clone().add(i, "days").format());
    }
    return setDaysInWeek(weekArray);
  }, [selectedDay]);

  // console.log("daysInweek", daysInWeek);
  // console.log("filter in scheudle component", filters)
  return (
    <div>
      <WeeklyCalendarHeader storeOpen={storeOpen} scheduleHrs={scheduleHrs} />
      <div className="Admin-weekly-calendar">
        <div className="Weekly-header">
          <ScheduleTableHeader
            selectedDay={selectedDay}
            endDayOfWeek={endDayOfWeek}
            daysInWeek={daysInWeek}
          />
        </div>
        <div className="Schedules">
          {schedules && (
            <ClickableSchedules
              schedules={schedules}
              positions={positions}
              daysInWeek={daysInWeek}
              storeOpen={storeOpen}
              scheduleHrs={scheduleHrs}
              timezone={storeTimeZone}
              filters={filters}
              selectedEmp={selectedEmp}
              setSchedModalOpen={setSchedModalOpen}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedSched={selectedSched}
              setSelectedSched={setSelectedSched}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
