import React from "react";

import WeeklySchedBar from "./WeeklySchedBar";
import ProfileBig from "../../../../../Reusables/components/ProfileBig";

const DisplayMySched = (props) => {
  const { myProfile, positions, daysInWeek,settingHrsObj, timezone,swapReqScheds } = props;
  const myPosition= positions.find((e)=>e.type===myProfile.position);
  // console.log(daysInWeek)

  // console.log('my schedules', myProfile, myPosition)
  return (
    <>
      <ProfileBig profile={myProfile} position={myPosition}/>

      <WeeklySchedBar
        daysInWeek={daysInWeek}
        settingHrsObj={settingHrsObj}
        schedules={myProfile?.schedules}
        timezone={timezone}
        swapReqScheds={swapReqScheds}
      />
    </>
  );
};

export default DisplayMySched;
