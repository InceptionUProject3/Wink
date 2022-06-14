import React, { useEffect, useState } from "react";

// import mockUsersData from "../mockUsersData.json";
import mockScheduleData from "../mockScheduleData.json";

import DailyCalendarSummary from "./DailyCalendarSummary";
import DailyCalendarTable from "./DailyCalendarTable";

import "./DailyCalendar.css";
import setPositionList from "../Reusables/functions/setPositionList";

const DailyCalendar = () => {
  //positon is set this level component to aaply same color in child components
  const [positions, setPositions] = useState();

  //bring user obj from useContext
  const user = { storeId: 1, userId: 4 };

  useEffect(() => {
    const fetchPositions = async () => {
      const positions = await fetch(
        `/api/schedule/positions/store/${user?.storeId}`
      );
      //enable this line
      // const res = await positions.json();
      // const positionWithColor = setPositionList(res.positions);
      const res= mockScheduleData;
      const positionWithColor = setPositionList(res)

      return setPositions(() => positionWithColor);
    };
    fetchPositions();
  }, []);
  //This useEffect is duplicated from weeklyTableBody

  return (
    // <div className="Daily-calendar">
    <div className="DailyCal-container">
      <DailyCalendarSummary positions={positions}/>
      <DailyCalendarTable positions={positions} />
    </div>
    // </div>
  );
};

export default DailyCalendar;
