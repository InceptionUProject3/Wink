import React, { useEffect, useState } from "react";
import moment from "moment";

// import mockUsersData from "../mockUsersData.json";
import mockScheduleData from "../mockScheduleData.json"

import findMy from "../Reusables/functions/findMy";

import setPositionList from "../Reusables/functions/setPositionList";

import "./DailyCalendar.css";
import DailyCalendarSummary from "./DailyCalendarSummary";
import DailyCalendarTable from "./DailyCalendarTable";

const DailyCalendar = () => {
  
  const [myProfile, setMyProfile] = useState();
  const [profColors, setProfColors] = useState(setPositionList(mockScheduleData));
  //bring user obj from useContext
   const currentUser = { userId: 4, storeId:1};
  //This useEffect is duplicated from weeklyTableBody
  useEffect(() => {
    const setAllProfiles = () => {
      //set my profile
      const currentUserProf = findMy(mockScheduleData, currentUser);
      setMyProfile(currentUserProf[0]);
    };
    setAllProfiles();
  }, []);



  return (
    // <div className="Daily-calendar">
      <div className="DailyCal-container">
        <DailyCalendarSummary myProfile={myProfile} profColors={profColors}/>
        < DailyCalendarTable myProfile={myProfile} />
        
      </div>
    // </div>
  );
};

export default DailyCalendar;
