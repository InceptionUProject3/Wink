import React, { useEffect, useState } from "react";
import { ProfileIcon } from "../../Reusables/components/ProfileIcon";

const OthersDailyScheds = (props) => {
  const { othersScheds, positions, displaySched } = props;
  const [groupedScheds, setGroupedScheds] = useState();

  useEffect(() => {
    const groupByPosition = () => {
      const initialVal = {};
      return othersScheds?.reduce((acc, current) => {
        // console.log(current.firstname)
        //filter empty schedules
        if(current.schedules.length!==0){
          
          if (!acc[current.position]) {
            acc[current.position] = [];
          }
          
          acc[current.position].push(current);
        }
     
        //order emplyees in every group
        acc[current.position]?.sort((a,b)=>a.firstname>b.firstname?1:-1)
        // console.log('after', acc[current.position])
        return acc;
      }, initialVal);
    };
    const groupedObj = groupByPosition();
    console.log("ordered", groupedObj)
    setGroupedScheds(() => groupedObj);
  }, [othersScheds]);

  return (
    <>
      {positions?.map((position, i) => {
        const empInPosition = groupedScheds && groupedScheds[position.position];
        if (empInPosition) {
          console.log('others day positon', position)
          return empInPosition?.map((sched, index) => {
            return (<React.Fragment key={`OtherDaySched ${i} ${index} `}>
              <div
                className="profile-container others"
                key={`day-profile ${i} ${index}`}
              >
                <ProfileIcon profile={sched} color={position.color} />
                <div className="name">
                  {sched?.firstname}, {sched?.lastname}
                </div>
              </div>
            <div className="schedules-container other">
              {/* {console.log(sched?.firstname)} */}
              {displaySched(sched?.schedules, sched?.userId)}
            </div>
            </React.Fragment>)
          });
        }
      })}
    </>
  );
};
export default OthersDailyScheds;
