/** Import resorces from files. It work as a "tools" to produce the functionality of the app. */
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import moment from "moment";
import mockUsersData from "../mockUsersData.json";
import findMy from "../Reusables/functions/findMy";
import setPositionList from "../Reusables/functions/setPositionList";
=======

import DailyCalendarSummary from "./DailyCalendarSummary";
import DailyCalendarTable from "./DailyCalendarTable";

>>>>>>> main
import "./DailyCalendar.css";
import setPositionList from "../Reusables/functions/setPositionList";
import { useContext } from "react";
import { StoreContext } from "../../authentication/StoreProvider";
import moment from "moment";

<<<<<<< HEAD
/** This resources below are in comments yet because problably will be use in the future. 
Line 13 to 17 contents this resources. */

/**
 import { ProfilePhoto } from "../Reusables/components/ProfilePhoto";
 import { ProfileIcon } from "../Reusables/components/ProfileIcon";
 import filterOutMy from "../Reusables/functions/filterOutMy";
*/

/**  UI allowing the user to obsever the relative day of th month. */
const DailyCalendar = () => {
<<<<<<< HEAD
  const [selectedDay, setSelectedDay] = useState(moment());
  const [myProfile, setMyProfile] = useState();
  const [profColors, setProfColors] = useState(setPositionList(mockUsersData));
  //Bring user obj. from useContext.
  const currentUser = { UserId: 2, storeId: 1 };

/** This useEffect is duplicated from weeklyTableBody. */
  useEffect(() => {
    const setAllProfiles = () => {
    //set my profile.
      const currentUserProf = findMy(mockUsersData, currentUser);
      setMyProfile(currentUserProf[0]);
    };
  // set all profiles.
    setAllProfiles();
  }, []);

/** Returns the result of .format ("") from Daily-container. */
return (
/** This resources below are in comments yet because problably will be use in the future. 
Line 41 content this resource. */
    //<div className="Daily-calendar">
      <div className="DailyCal-container">
        <DailyCalendarSummary myProfile={myProfile} profColors={profColors}/>
        <div>{selectedDay?.format("MMM DD")}</div>
        <div>{selectedDay?.format("dddd")}</div>
      </div>
=======
  //positon is set this level component to aaply same color in child components
  const [positions, setPositions] = useState();
=======
const DailyCalendar = (props) => {
  const { selectedDay, setSelectedDay } = props;
>>>>>>> main

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
    <div className="DailyCal-container">
      <DailyCalendarSummary positions={positions} />
      <DailyCalendarTable
        positions={positions}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        daySchedules={daySchedules}
      />
    </div>
<<<<<<< HEAD
    // </div>
>>>>>>> main
=======
>>>>>>> main
  );
};

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project DailyCalendar. */
export default DailyCalendar;
