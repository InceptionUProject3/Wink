import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import { StoreContext } from "../../components/authentication/StoreProvider";
import { LoginContext } from "../../components/authentication/LoginProvider";

import Schedule from "../../components/admin/schedule/Schedule";
import Sidebar from "../../components/admin/schedule/sidebar/Sidebar";
import setPositionList from "../../components/Reusables/functions/setPositionList";

import "./adminSchedule.css";

const AdminSchedule = () => {
  const [schedules, setSchedules] = useState();
  const [startDaysOfWeek, setStartDaysOfWeek] = useState();
  const [selectedStart, setSelectedStart] = useState();
  const [empList, setEmpList] = useState([]);
  const [filters, setFilters] = useState({});
  const [schedModalOpen, setSchedModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedSched, setSelectedSched] = useState({
    User_idUser: "",
    Store_idStore: "",
    starttime: "",
    endtime: "",
    workcode: 0,
  });

  const userId = useContext(LoginContext).user?.id || 9;
  const storeId = useContext(StoreContext).store?.Store_idStore || 1;

  const storeTimeZone =
    useContext(StoreContext).store?.store.timeZone || "America/New_York";
  const [settingHrsObj, setSettingHrsObj] = useState({
    startTimeOfDay: moment.tz("06:00", "HH:mm", storeTimeZone), scheduleHrs: 18
  });
  // const startTimeOfDay = moment.tz("06:00", "HH:mm", storeTimeZone);
  // const scheduleHrs = 18;

  //Set an array with 4 consecutive Sundays for scheduling periods
  useEffect(() => {
    const setWeeksArray = () => {
      const startThisWeek = moment.tz(moment(), storeTimeZone).startOf("week");
      const weekArray = [];
      for (let i = 0; i < 4; i++) {
        const newWeekStart = startThisWeek?.clone().add(i, "weeks");
        weekArray.push(newWeekStart);
      }
      //set variable startDaysOfWeek
      setStartDaysOfWeek(weekArray);
      //set initial period to this week.
      setSelectedStart(weekArray[0]);
    };
    setWeeksArray();
  }, []);

  //Read scheudles
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const startDay = selectedStart?.clone().format();
        const data = await fetch(
          `/api/schedule/week?storeId=${storeId}&userId=${userId}&startDay=${startDay}`
        );
        const scheduleData = await data.json();
        console.log("fetching schedule data", scheduleData);

        const scheduleArray = [
          ...scheduleData.mySchedules,
          ...scheduleData.coworkersSchedules,
        ];
        setSchedules(() => scheduleArray);
      } catch (err) {
        console.log("failed to fetch schedule data", err);
        setSchedules(() => null);
      }
    };
    selectedStart && fetchAllData();
  }, [selectedStart, schedModalOpen]);

  //Set initial filter(employees, availability, positions) values
  useEffect(() => {
    console.log("useEffect set initial filters");
    //set position variables which List
    const coleredPosArray = setPositionList(schedules);

    const getInitialFilters = () => {
      //Set position filter with boolean
      const positionFilterArray = [];
      coleredPosArray?.map((p) => {
        return positionFilterArray.push({
          type: p.type,
          color: p.color,
          value: true,
        });
      });
      //add hours and selected employees filter with boolean
      const initialfilterObj = {
        hours: [
          { type: "> 30hrs", max: null, min: 30, value: true },
          { type: "20hrs - 30hrs", max: 30, min: 20, value: true },
          { type: "< 20hrs", max: 20, min: 0, value: true },
        ],
        positions: positionFilterArray,
        employees: [],
      };
      setFilters(() => initialfilterObj);
    };
    //set EmployeeList for employee filter
    const getEmployeeList = () => {
      schedules?.map((sched) => {
        const foundPos = coleredPosArray.find((p) => sched.position === p.type);
        setEmpList((pre) => [
          ...pre,
          {
            userId: sched.userId,
            firstname: sched.firstname,
            lastname: sched.lastname,
            position: foundPos,
          },
        ]);
      });
    };
    getInitialFilters();
    getEmployeeList();
  }, [schedules]);

  return (
    <div className="Admin-schedule">
      <div className="schedule-container">
        <Schedule
          selectedDay={selectedStart}
          settingHrsObj={settingHrsObj}
          schedules={schedules}
          filters={filters}
          setSchedModalOpen={setSchedModalOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedSched={selectedSched}
          setSelectedSched={setSelectedSched}
        />
      </div>
      <div className="Side-bar-container">
        <Sidebar
          storeZone={storeTimeZone}
          startDaysOfWeek={startDaysOfWeek}
          selectedStart={selectedStart}
          setSelectedStart={setSelectedStart}
          filters={filters}
          setFilters={setFilters}
          empList={empList}
        />
      </div>
    </div>
  );
};

export default AdminSchedule;
