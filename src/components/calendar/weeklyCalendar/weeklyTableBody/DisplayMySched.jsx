import React from "react";

import WeeklySchedBar from "./WeeklySchedBar";
import ProfileBig from "../../../Reusables/components/ProfileBig";

const DisplayMySched = (props) => {
  const { myProfile, positions, daysInWeek, storeOpen, scheduleHrs, timezone } = props;
  const myPosition= positions.find((e)=>e.position===myProfile.position);
  // console.log(daysInWeek)

  // console.log('my schedules', myProfile, myPosition)
  return (
    <>
      <ProfileBig profile={myProfile} position={myPosition}/>

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
