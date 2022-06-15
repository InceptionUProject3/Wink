/** Import resorces from files. It work as a "tools" to produce the functionality of the app. */
import React from "react";
import { ProfileIcon } from "../Reusables/components/ProfileIcon";

/** The DailyCalendarSummary methods must return a Promise. */
const DailyCalendarSummary = (props) => {
  const { myProfile, profColors } = props;

/** The findMyColor methods must return a Promise. */
  const findMyColor = (profile) => {
    const positionObj = profColors?.find(
      (obj) => obj?.position === profile?.position
    );
    return positionObj?.color;
  };

/** Returns the result of class such as: Weekly-summary-container, title, Weekly-summary, User-profile, User-name, summary. */
  return (
    <div className="Weekly-summary-container">
      <div className="title">Weekly Summary</div>
      <div className="Weekly-summary">
        <div className="User-profile">
          {/* <ProfilePhoto profile={myProfile} /> */}
          <ProfileIcon profile={myProfile} color={findMyColor(myProfile)} />
          <div className="User-name">
            {myProfile?.firstname}, {myProfile?.lastname}
          </div>
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
  );
};

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project DailyCalendarSummary. */
export default DailyCalendarSummary;

