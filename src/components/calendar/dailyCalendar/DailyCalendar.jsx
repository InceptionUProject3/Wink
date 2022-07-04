import React, { useEffect, useState } from "react";

import DailyCalendarTable from "./dailyComponents/DailyCalendarTable";

import "./DailyCalendar.css";
import setPositionList from "../../Reusables/functions/setPositionList";
import { useContext } from "react";
import { StoreContext } from "../../authentication/StoreProvider";
import moment from "moment";
import { LoginContext } from "../../authentication/LoginProvider";

const DailyCalendar = (props) => {
  const { selectedDay, setSelectedDay } = props;

  //positon is set this level component to apply same color in child components
  const [positions, setPositions] = useState();
  const [myDaySchedules, setMyDaySchedules] = useState();
  const [coworkerDaySchedules, setCoworkerDaySchedules] = useState();
  const storeId = useContext(StoreContext).store?.Store_idStore || 1;
  const userId = useContext(LoginContext).user?.id || 9;

  const storeTimeZone =
    useContext(StoreContext).store?.store.timeZone || "America/New_York";
  const userTimeZone = moment.tz.guess();
  //  console.log(userTimeZone)
  const storeOpen = moment.tz("06:00", "HH:mm", storeTimeZone).tz(userTimeZone);
  const scheduleHrs = 18;

  useEffect(() => {
    const getAllSchedules = async () => {
      try {
        const day = selectedDay.clone().format("YYYY-MM-DD");
        // console.log('selectedday', day)
        const schedules = await fetch(
          `/api/schedule/day?storeId=${storeId}&userId=${userId}&day=${day}`
        );

        const res = await schedules.json();
        console.log("response schedules", res);

        setMyDaySchedules(() => res.mySchedules);
        setCoworkerDaySchedules(() => res.coworkersSchedules);
        // console.log("here");

        const positionArray = setPositionList([
          ...res.mySchedules,
          ...res.coworkersSchedules,
        ]);
        setPositions(() => positionArray);
      } catch (err) {
        console.log("Failed to fetch day schedules", err);
        setMyDaySchedules(() => null);
        setCoworkerDaySchedules(() => null);
      }
    };
    storeId && getAllSchedules();
  }, [selectedDay]);

  return (
    <div className="DailyCal-container">
    
      <DailyCalendarTable
        positions={positions}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        myDaySchedules={myDaySchedules}
        coworkerDaySchedules={coworkerDaySchedules}
        storeOpen={storeOpen}
        scheduleHrs={scheduleHrs}
      />
    </div>
  );
};

export default DailyCalendar;
