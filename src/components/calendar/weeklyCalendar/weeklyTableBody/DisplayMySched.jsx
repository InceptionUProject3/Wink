import React from "react";

import WeeklySchedBar from "./WeeklySchedBar";
import ProfileBig from "./ProfileBig";
// import { ProfilePhoto } from "../../Reusables/components/ProfilePhoto";
// import displaySched from "../../Reusables/functions/displaySched";

const DisplayMySched = (props) => {
  const { myProfile, positions, daysInWeek, storeOpen, scheduleHrs, timezone } = props;

  // console.log(daysInWeek)

  // console.log('my schedules', myProfile?.schedules)
  return (
    <>
      <ProfileBig profile={myProfile} positions={positions}/>

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
