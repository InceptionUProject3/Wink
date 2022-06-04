import React, { useEffect, useState } from "react";
import moment from "moment";

import mockUsersData from "../mockUsersData.json";

import { ProfilePhoto } from "../Reusables/components/ProfilePhoto";
import { ProfileIcon } from "../Reusables/components/ProfileIcon";
import findMy from "../Reusables/functions/findMy";
import filterOutMy from "../Reusables/functions/filterOutMy";
import setPositionList from "../Reusables/functions/setPositionList";

import "./DailyCalendar.css";

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

  const findMyColor = (profile) => {
    const positionObj = profColors?.find(
      (obj) => obj?.position === profile?.position
    );
    return positionObj?.color;
  };

  return (
    <div className="Daily-calendar">
      <div className="DailyCal-container">
        <div className="Weekly-summary-container">
          <div>Weekly Summary</div>
          <div className="Weekly-summary">
            <div className="User-profile">
              <ProfilePhoto profile={myProfile} />
              <ProfileIcon profile={myProfile} color={findMyColor(myProfile)} />
              <div className="User-name">{myProfile?.name}</div>
            </div>
            <div className="summary">
              <div>
                <span>Period:</span>
                <span>~</span>
              </div>
              <div>
                <span>Expected hours:</span>
                <span>~</span>
              </div>
              <div>
                <span>Scheduled hours:</span>
                <span>~</span>
              </div>
            </div>
          </div>
        </div>
        <div>{selectedDay?.format("MMM DD")}</div>
        <div>{selectedDay?.format("dddd")}</div>
      </div>
    </div>
  );
};

export default DailyCalendar;
