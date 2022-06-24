import React from "react";
import { ProfileIcon } from "../../Reusables/components/ProfileIcon";
import WeeklySchedBar from "../../Reusables/components/WeeklySchedBar";
// import { ProfilePhoto } from "../../Reusables/components/ProfilePhoto";
// import displaySched from "../../Reusables/functions/displaySched";

const DisplayMySched = (props) => {
  const { myProfile, positions, daysInWeek, storeOpen, scheduleHrs, timezone } = props;

  // console.log(daysInWeek)
  const findColor = () => {
    const myPositionObj = positions?.find(
      (position) => myProfile?.position === position.position
    );
    const color = myPositionObj?.color;
    // console.log(color)
    return color;
  };
  // console.log('my schedules', myProfile?.schedules)
  return (
    <>
      <div className="WeeklyCal-Profiles myProfile">
        {/* <ProfilePhoto profile={myProfile} /> */}

        <div className="title">
          <div className="iconNme">
            <ProfileIcon profile={myProfile} color={findColor()} />
            <div className="me">me</div>
          </div>
          <div className="position">{myProfile?.position}</div>
        </div>
        <div className="Name-container">
          <div className="name">
            {myProfile?.firstname}, {myProfile?.lastname}
          </div>
        </div>
      </div>

      <WeeklySchedBar
        daysInWeek={daysInWeek}
        storeOpen={storeOpen}
        scheduleHrs={scheduleHrs}
        schedules={myProfile?.schedules}
        timezone={timezone}
      />
    </>
  );
};

export default DisplayMySched;
