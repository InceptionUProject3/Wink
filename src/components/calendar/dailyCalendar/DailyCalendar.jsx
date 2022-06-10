import React, { useEffect, useState } from "react";
import moment from "moment";

import mockUsersData from "../mockUsersData.json";

// import { ProfilePhoto } from "../Reusables/components/ProfilePhoto";
// import { ProfileIcon } from "../Reusables/components/ProfileIcon";
import findMy from "../Reusables/functions/findMy";
// import filterOutMy from "../Reusables/functions/filterOutMy";
import setPositionList from "../Reusables/functions/setPositionList";

import "./DailyCalendar.css";
import DailyCalendarSummary from "./DailyCalendarSummary";

const DailyCalendar = () => {
  const [selectedDay, setSelectedDay] = useState(moment());
  const [myProfile, setMyProfile] = useState();
  const [profColors, setProfColors] = useState(setPositionList(mockUsersData));
  //bring user obj from useContext
  const currentUser = { UserId: 2, storeId: 1 };
  //This useEffect is duplicated from weeklyTableBody
  useEffect(() => {
    const setAllProfiles = () => {
      //set my profile
      const currentUserProf = findMy(mockUsersData, currentUser);
      setMyProfile(currentUserProf[0]);
    };
    setAllProfiles();
  }, []);



  return (
    // <div className="Daily-calendar">
      <div className="DailyCal-container">
        <DailyCalendarSummary myProfile={myProfile} profColors={profColors}/>
        <div>{selectedDay?.format("MMM DD")}</div>
        <div>{selectedDay?.format("dddd")}</div>
      </div>
    // </div>
  );
};

export default DailyCalendar;
