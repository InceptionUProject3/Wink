import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import Schedule from "../../components/admin/schedule/Schedule";
import Sidebar from "../../components/admin/schedule/sidebar/Sidebar";
import setPositionList from "../../components/calendar/Reusables/functions/setPositionList";
import { StoreContext } from "../../components/authentication/StoreProvider";
import { LoginContext } from "../../components/authentication/LoginProvider";

import "./adminSchedule.css";

const AdminSchedule = () => {
  const [startWeeks, setStartWeeks] = useState();
  const [selectedStart, setSelectedStart] = useState();
  const [positions, setPositions] = useState();
  const [schedules, setSchedules] = useState();
  const [filters, setFilters] = useState();
  const userId = useContext(LoginContext).user?.id || 9;
  const storeId = useContext(StoreContext).store?.Store_idStore || 1;
  // console.log("This week start", startWeeks);

  const storeTimeZone =
    useContext(StoreContext).store?.store.timeZone || "America/New_York";
  // const userTimeZone = moment.tz.guess();
  const storeOpen = moment.tz("06:00", "HH:mm", storeTimeZone);
  const scheduleHrs = 18;

  useEffect(() => {
    const setWeeksArray = () => {
      const startThisWeek = moment.tz(moment(), storeTimeZone).startOf("week");
      const weekArray = [];
      for (let i = 0; i < 4; i++) {
        const newWeekStart = startThisWeek?.clone().add(i, "weeks");
        weekArray.push(newWeekStart);
      }
      // console.log('weekArray', weekArray)
      setStartWeeks(weekArray);
      setSelectedStart(weekArray[0]);
    };
    setWeeksArray();
  }, []);
  // console.log("selectedStart", selectedStart);
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const startDay = selectedStart.clone().format();
        console.log("startDay", selectedStart.format());
        const data = await fetch(
          `/api/schedule/week?storeId=${storeId}&userId=${userId}&startDay=${startDay}`
        );
        const scheduleData = await data.json();
        // console.log("data", scheduleData);
        const scheduleArray = [
          ...scheduleData.mySchedules,
          ...scheduleData.coworkersSchedules,
        ];
        setSchedules(() => scheduleArray);
        const positionArray = setPositionList(scheduleArray);
        setPositions(positionArray);
      } catch (err) {
        console.log("failed to fetch schedule data", err);
        setSchedules(() => null);
      }
    };
    selectedStart && fetchAllData();
  }, [selectedStart]);
  //  console.log("position List and data", positions, schedules);
  useEffect(() => {
    const positionArray = [];
    positions?.map((p) => {
      positionArray.push({ type: p.position, value: true });
    });
    // console.log("positionArray", positionArray);
    const initialfilterObj = {
      hours: [
        { type: "> 30hrs", value: true },
        { type: "20hrs - 30hrs ", value: true },
        { type: "< 20hrs", value: true },
      ],
      positions: positionArray,
    };
    // console.log('initial filter obj', initialfilterObj);
    return setFilters(()=>initialfilterObj)
  }, [positions]);

  return (
    <div className="Admin-schedule">
      <div className="schedule-container">
        <Schedule
          selectedDay={selectedStart}
          storeOpen={storeOpen}
          scheduleHrs={scheduleHrs}
          positions={positions}
          schedules={schedules}
          filters={filters}
        />
      </div>
      <div className="Side-bar-container">
        <Sidebar
          storeZone={storeTimeZone}
          startWeeks={startWeeks}
          selectedStart={selectedStart}
          setSelectedStart={setSelectedStart}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </div>
  );
};

export default AdminSchedule;
