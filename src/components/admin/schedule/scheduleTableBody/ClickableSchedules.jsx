import React, { useEffect, useState } from "react";
import ClickableScheduleBar from "./ClickableScheduleBar"
import groupByPosition from '../../../calendar/Reusables/functions/groupByPosition'
import ProfileSmall from "../../../calendar/Reusables/components/ProfileSmall";

const ClickableSchedules = (props) => {
  const { schedules, positions, daysInWeek, storeOpen, scheduleHrs, timezone } = props;
// console.log("all", schedules, positions, daysInWeek, storeOpen, storeClose)
  const [groupedProfs, setGroupedProfs] = useState();

  useEffect(() => {
    const groupedObj = groupByPosition(schedules);
    setGroupedProfs(() => groupedObj);
  }, [schedules]);

  return (
    <>
      {positions?.map((position, i) => {
        const empInPositon = groupedProfs && groupedProfs[position.position];
        if (empInPositon) {
          return empInPositon?.map((emp, index) => {
            // console.log('emp', emp)
            return (
              <React.Fragment key={`OtherScheds ${i} ${index}`}>
                
                <ProfileSmall emp={emp} position={position} i={i} index={index}/>
                <ClickableScheduleBar
                  daysInWeek={daysInWeek}
                  storeOpen={storeOpen}
                  scheduleHrs={scheduleHrs}
                  employeeSched={emp}
                  // schedules={emp.schedules}
                  // employeeId={emp.userId}
                  // employeeName={`${emp.firstname}, ${emp.lastname}`}
                  timezone={timezone}
                  position={position}
                />
              </React.Fragment>
            );
          });
        }
      })}
    </>
  );
};

export default ClickableSchedules;
