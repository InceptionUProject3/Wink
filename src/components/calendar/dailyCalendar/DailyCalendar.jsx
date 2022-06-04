import React, { useEffect, useState } from "react";
import moment from "moment";

import mockUsersData from "../mockUsersData.json";

import { ProfilePhoto } from "../Reusables/components/ProfilePhoto";

import "./DailyCalendar.css";

const DailyCalendar = () => {
  const [selectedDay, setSelectedDay] = useState(moment());

  //This useEffect is duplicated from weeklyTableBody
//   useEffect(() => {
//     const setAllProfiles = () => {
//       //set my profile
//       const currentUserProf = findMy(mockUsersData);
//       setMyProfile(currentUserProf[0]);
//       //set coworkers' profiles
//       const otherProfs = filterOutMy(mockUsersData);
//       setCowokerProfs(otherProfs);
//     };
//     setAllProfiles();
//   }, []);
  return (
    <div className="Daily-calendar">
      <div className="DailyCal-container">
          <div className="Weekly-summary">
            <div className="User-profile">
                <ProfilePhoto/>
            </div>
          </div>
        <div>{selectedDay?.format("MMM DD")}</div>
        <div>{selectedDay?.format("dddd")}</div>
      </div>
    </div>
  );
};

export default DailyCalendar;
