import React, { useEffect, useState } from "react";

// import mockUsersData from "../mockUsersData.json";
import mockScheduleData from "../mockScheduleData.json";

import DailyCalendarSummary from "./DailyCalendarSummary";
import DailyCalendarTable from "./DailyCalendarTable";

import "./DailyCalendar.css";
import setPositionList from "../Reusables/functions/setPositionList";
import { useContext } from "react";
import { StoreContext } from "../../authentication/StoreProvider";
import { LoginContext } from "../../authentication/LoginProvider";
import moment from "moment";

const DailyCalendar = (props) => {
  const { selectedDay, setSelectedDay } = props;

  //positon is set this level component to apply same color in child components
  const [positions, setPositions] = useState();
  const [daySchedules, setDaySchedules] = useState();
  const storeId = useContext(StoreContext).store?.Store_idStore || 1;

  //set sd
  useEffect(() => {
    const getAllSchedules = async () => {
      try {
        const day = selectedDay.clone().format("YYYY-MM-DD");
        const schedules = await fetch(
          `/api/schedule/day?storeId=${storeId}&day=${day}`
        );

        const res = await schedules.json();
        console.log("response schedules", res);
        setDaySchedules(() => res);

        const positionArray = setPositionList(res);
        setPositions(() => positionArray);
      } catch (err) {
        console.log("Failed to fetch day schedules");
        setDaySchedules(() => null);
      }
    };
    storeId && getAllSchedules();
  }, [selectedDay]);

  return (
    // <div className="Daily-calendar">
    <div className="DailyCal-container">
      <DailyCalendarSummary positions={positions} />
      <DailyCalendarTable
        positions={positions}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        daySchedules={daySchedules}
      />
    </div>
    // </div>
  );
};

export default DailyCalendar;
