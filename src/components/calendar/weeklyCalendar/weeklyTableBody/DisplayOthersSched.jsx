import React from "react";
import { ProfileIcon } from "../../Reusables/components/ProfileIcon";
// import { ProfilePhoto } from "../../Reusables/components/ProfilePhoto";

const DisplayOthersSched = (props) => {
  const { cowokerProfs, cowerkerScheds, displaySched,positions } = props;

 
  const groupByPosition = () => {
    const initialVal = {};
    return cowokerProfs?.reduce((acc, current) => {
      // console.log("previous value", acc);
      // console.log("current value", current);
      if (!acc[current.position]) {
        acc[current.position] = [];
      }

      acc[current.position].push(current);
      return acc;
    }, initialVal);
  };

  // const positions = setPositionList(cowokerProfs);
  const groupedProfs = groupByPosition();

  return positions?.map((position) => {
    const onlyPosition = position.position
    return groupedProfs[onlyPosition]?.map((prof, i) => {
      if (prof.position === onlyPosition) {
        const schedsForOne = cowerkerScheds?.filter(
          
          (sched) => sched.UserId === prof.UserId
        );
        // console.log("should be all scheds per person", schedsForOne)
        return (
          <React.Fragment key={`OtherScheds ${i}`}>
            <div className="WeeklyCal-Profiles others" key={`profile ${i}`}>
              {i === 0 && (
                <div className="title others" key={`position ${i}`}>
                  <ProfileIcon profile={prof} color={position.color}/>
                  <div>{position.position}</div>
                </div>
              )}
              <div className="profile" key={`profile ${i}`}>
              {/* <ProfilePhoto profile={prof}/> */}
              <div key={`name ${i}`}>{prof.name}</div>
            </div>
            </div>
            {displaySched(schedsForOne)}
          </React.Fragment>
        );
      }
    });
  });
};

export default DisplayOthersSched;
