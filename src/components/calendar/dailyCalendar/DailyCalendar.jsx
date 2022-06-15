import React, { useEffect, useState } from "react";

// import mockUsersData from "../mockUsersData.json";
import mockScheduleData from "../mockScheduleData.json";

import DailyCalendarSummary from "./DailyCalendarSummary";
import DailyCalendarTable from "./DailyCalendarTable";

import "./DailyCalendar.css";
import setPositionList from "../Reusables/functions/setPositionList";

const DailyCalendar = () => {
  //positon is set this level component to apply same color in child components
  const [positions, setPositions] = useState();

  //bring user obj from useContext
  const storeId = 1;
  const userId = 4;

  //set sd
  useEffect(() => {
    const fetchPositions = async () => {
      const positions = await fetch(
        `/api/schedule/positions/store/${storeId}`
      );
      //enable this line
      // const res = await positions.json();
      // const positionWithColor = setPositionList(res.positions);
      const res = mockScheduleData;
      const positionWithColor = setPositionList(res);

      return setPositions(() => positionWithColor);
    };
    fetchPositions();
  }, []);


  // useEffect(() => {
  //   const getAllSchedules = async () => {
  //     try{//need to fetch schedule with priod from server
  //     const weekStart = startDay.clone().format("YYYY-MM-DD HH:mmZ");
  //     // console.log("weekstart", selectedDay, weekStart);
  //     const res = await fetch(
  //       `/api/schedule/week?storeId=${storeId}&startDay=${weekStart}`
  //     );
  //     const scheduleData = await res.json();
  //     // console.log('fetched data', scheduleData)
  //     setScheduleData(() => scheduleData);
  //     //enable this line chduleData
  //     const positionArray = scheduleData && setPositionList(scheduleData);
  //     setPositions(positionArray);}
  //     catch{
  //       setScheduleData(() => null);

  //     }
  //     //Filter cowokers' schedules and only bring those which meet this period condition. Send startDay and endDay and store info to find schedule to backend
  //     // const thisWeekSched = mockScheduleData?.filter(
  //     //   (sched) =>
  //     //     moment(sched.endTime, "MMM DD YYYY HH:mm") > startDay &&
  //     //     moment(sched.startTime, "MMM DD YYYY HH:mm") < endDay
  //     // );
  //   };
  //   storeId&&getAllSchedules();
  // }, [selectedDay]);
  //This useEffect is duplicated from weeklyTableBody

  return (
    // <div className="Daily-calendar">
    <div className="DailyCal-container">
      <DailyCalendarSummary positions={positions} />
      <DailyCalendarTable positions={positions} />
    </div>
    // </div>
  );
};

export default DailyCalendar;
