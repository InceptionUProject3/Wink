import moment from "moment";
import React, { useEffect, useState } from "react";
import { ProfileIcon } from "../../Reusables/components/ProfileIcon";

const DailyCalendarSummary = (props) => {
  const { positions } = props;

  const [userSummary, setUserSummary] = useState();
// console.log("postions", positions)
  useEffect(() => {
    const fetchUserSummary = async () => {
      //switch endpoint to get userSummary
      // const res = await fetch(``);
      const res = {
        firstname: "Tim",
        lastname: "Wink",
        position: "Receptionist",
        availableHrs: 30,
        scheduledHrs: 35,
      };
      return setUserSummary(() => res);
    };
    fetchUserSummary();
  }, []);

  const findMyColor = (profile) => {
    const positionObj = positions?.find(
      (obj) => obj?.position === profile?.position
    );
    // console.log("color", profile, positions);
    return positionObj?.color;
  };
  const displayPeriod = () => {
    const today = moment();
    const startOfWeek = today.clone().startOf("week").format("MMM Do");
    const endofWeek = today.clone().endOf("week").format("MMM Do");
    // console.log("today", startOfWeek, endofWeek);
    return (
      <div>
        <span>Period:</span>
        <span>
          {startOfWeek} ~ {endofWeek}
        </span>
      </div>
    );
  };

  return (
    <div className="Weekly-summary-container">
      <div className="title">Weekly Summary</div>
      <div className="Weekly-summary">
        <div className="User-profile">
          <ProfileIcon profile={userSummary} color={findMyColor(userSummary)} />
          <div className="position">{userSummary?.position}</div>
          <div className="User-name">
            {userSummary?.firstname}, {userSummary?.lastname}
          </div>
        </div>
        <div className="summary">
          {displayPeriod()}
          <div>
            <span>Expected hours:</span>
            <span>{userSummary?.availableHrs} hrs</span>
          </div>
          <div>
            <span>Scheduled hours:</span>
            <span>{userSummary?.scheduledHrs} hrs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCalendarSummary;
