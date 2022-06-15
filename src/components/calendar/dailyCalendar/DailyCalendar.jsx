/** Import resorces from files. It work as a "tools" to produce the functionality of the app. */
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import moment from "moment";
import mockUsersData from "../mockUsersData.json";
import findMy from "../Reusables/functions/findMy";
import setPositionList from "../Reusables/functions/setPositionList";
=======

// import mockUsersData from "../mockUsersData.json";
import mockScheduleData from "../mockScheduleData.json";

import DailyCalendarSummary from "./DailyCalendarSummary";
import DailyCalendarTable from "./DailyCalendarTable";

>>>>>>> main
import "./DailyCalendar.css";
import setPositionList from "../Reusables/functions/setPositionList";

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
>>>>>>> main
  );
};

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project DailyCalendar. */
export default DailyCalendar;
