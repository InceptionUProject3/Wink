/** Import resorces from files. It work as a "tools" to produce the functionality of the app. */
import React, { useEffect, useState } from "react";
import moment from "moment";
import mockUsersData from "../mockUsersData.json";
import findMy from "../Reusables/functions/findMy";
import setPositionList from "../Reusables/functions/setPositionList";
import "./DailyCalendar.css";
import DailyCalendarSummary from "./DailyCalendarSummary";

/** This resources below are in comments yet because problably will be use in the future. 
Line 13 to 17 contents this resources. */

/**
 import { ProfilePhoto } from "../Reusables/components/ProfilePhoto";
 import { ProfileIcon } from "../Reusables/components/ProfileIcon";
 import filterOutMy from "../Reusables/functions/filterOutMy";
*/

/**  UI allowing the user to obsever the relative day of th month. */
const DailyCalendar = () => {
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
  );
};

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project DailyCalendar. */
export default DailyCalendar;
