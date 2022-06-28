import React, { useEffect, useState } from "react";
import ClickableScheduleBar from "./ClickableScheduleBar";
import groupByPosition from "../../../calendar/Reusables/functions/groupByPosition";
import ProfileSmall from "../../../calendar/Reusables/components/ProfileSmall";

const ClickableSchedules = (props) => {
  const {
    schedules,
    positions,
    daysInWeek,
    storeOpen,
    scheduleHrs,
    timezone,
    filters,
  } = props;
  // console.log("all", schedules, positions, daysInWeek, storeOpen, storeClose)
  const [groupedProfs, setGroupedProfs] = useState();
  const [filteredPos, setFilteredPos] = useState();
//filter update
  useEffect(() => {
    console.log("filters", filters);
    // const filteringHrs = () => {
    //   const filterHrs = filters?.hours;
    //   filterHrs?.map((hrs) => {
    //     if (hrs.type === "> 30hrs") {
    //       console.log("in gt 30");
    //     } else if (hrs.type === "20hrs - 30hrs") {
    //       console.log("in bt 20- 30");
    //     } else if (hrs.type === "< 20hrs") {
    //       console.log("in lt 20");
    //     }
    //   });
    // };
    const filteringPosition = () => {
      const positionfilterArr = filters?.positions;
      const newPosition=[]
      positions?.map((p, i) => {
        const checked = positionfilterArr.some((e) => {
          if (e.type === p.position) {
            // console.log("position value",e)
            return e.value;
          }
        });
        console.log("checked", checked)
        if (checked === true) {
          console.log("true", p)
          newPosition.push(p)
        };
        
      });
      // console.log("newPosition",newPosition)
      return setFilteredPos (()=>newPosition)
    };
     filteringPosition();
    
  }, [schedules, filters, positions]);

  useEffect(()=>{
    const groupedObj = groupByPosition(schedules);
    setGroupedProfs(() => groupedObj);
  },[filteredPos,schedules])

  console.log("filtered scheduels",filteredPos);
  console.log('grouped',groupedProfs)
  return (
    <>
      {filteredPos?.map((position, i) => {
        const empInPositon = groupedProfs && groupedProfs[position.position];
        if (empInPositon) {
          return empInPositon?.map((emp, index) => {
            // console.log('emp', emp)
            return (
              <React.Fragment key={`OtherScheds ${i} ${index}`}>
                <ProfileSmall
                  emp={emp}
                  position={position}
                  i={i}
                  index={index}
                />
                <ClickableScheduleBar
                  daysInWeek={daysInWeek}
                  storeOpen={storeOpen}
                  scheduleHrs={scheduleHrs}
                  employeeSched={emp}
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
