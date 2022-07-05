import React, { useEffect, useState } from "react";

import WeeklySchedBar from "./WeeklySchedBar";
import groupByPosition from '../../../../Reusables/functions/groupByPosition'
import ProfileSmall from "../../../../Reusables/components/ProfileSmall";

const DisplayOthersSched = (props) => {
  const { schedules, positions, daysInWeek, settingHrsObj, timezone } = props;
// console.log("all", cowokerProfs, positions, daysInWeek, storeOpen, storeClose)
  const [groupedProfs, setGroupedProfs] = useState();

  useEffect(() => {
      const groupedObj = groupByPosition(schedules);
      setGroupedProfs(() => groupedObj);
  }, [schedules]);


  
  return (
    <>
      {positions?.map((position, i) => {
        const empInPositon = groupedProfs && groupedProfs[position.type];
        if (empInPositon) {
          return empInPositon?.map((emp, index) => {
            return (
              <React.Fragment key={`OtherScheds ${i} ${index}`}>
                <ProfileSmall emp={emp} position={position} i={i} index={index} />
                <WeeklySchedBar
                  daysInWeek={daysInWeek}
                  settingHrsObj={settingHrsObj}
                  schedules={emp.schedules}
                  timezone={timezone}
                />
              </React.Fragment>
            );
          });
        }
      })}
    </>
  );
};

export default DisplayOthersSched;
