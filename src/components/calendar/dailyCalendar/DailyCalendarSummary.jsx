<<<<<<< HEAD
/** Import resorces from files. It work as a "tools" to produce the functionality of the app. */
import React from "react";
=======
import moment from "moment";
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
>>>>>>> main
=======
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../authentication/LoginProvider";
import { StoreContext } from "../../authentication/StoreProvider";
>>>>>>> main
import { ProfileIcon } from "../Reusables/components/ProfileIcon";

/** The DailyCalendarSummary methods must return a Promise. */
const DailyCalendarSummary = (props) => {
  const { positions } = props;

  const userId = useContext(LoginContext).user?.id || 6;
  const storeId = useContext(StoreContext).store?.Store_idStore || 1;

  const [userSummary, setUserSummary] = useState();
console.log("postions", positions)
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

/** The findMyColor methods must return a Promise. */
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

/** Returns the result of class such as: Weekly-summary-container, title, Weekly-summary, User-profile, User-name, summary. */
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

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project DailyCalendarSummary. */
export default DailyCalendarSummary;

