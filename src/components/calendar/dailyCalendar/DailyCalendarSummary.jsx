import React from "react";
import { ProfileIcon } from "../Reusables/components/ProfileIcon";

const DailyCalendarSummary = (props) => {
  const { myProfile, profColors } = props;

  const findMyColor = (profile) => {
    const positionObj = profColors?.find(
      (obj) => obj?.position === profile?.position
    );
    return positionObj?.color;
  };

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

export default DailyCalendarSummary;
