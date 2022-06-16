import React, { useEffect, useState } from "react";
import { ProfileIcon } from "../../Reusables/components/ProfileIcon";

const OthersDailyScheds = (props) => {
  const { othersScheds, positions,displaySched } = props;
  const [groupedScheds, setGroupedScheds] = useState();

  useEffect(() => {
    const groupByPosition = () => {
      const initialVal = {};
      return othersScheds?.reduce((acc, current) => {
        if (!acc[current.position]) {
          acc[current.position] = [];
        }

        acc[current.position].push(current);
        return acc;
      }, initialVal);
    };
    const groupedObj = groupByPosition();
    setGroupedScheds(() => groupedObj);
  }, [othersScheds]);

  return (
    <>
      {positions?.map((position, i) => {
        const empInPosition = groupedScheds && groupedScheds[position.position];
        if (empInPosition) {
          // console.log('others day positon', position)
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
