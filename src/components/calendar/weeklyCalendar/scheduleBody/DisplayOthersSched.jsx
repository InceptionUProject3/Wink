import React from "react";
import { FaUserCircle } from "react-icons/fa";

const DisplayOthersSched = (props) => {
  const { cowokerProfs, cowerkerScheds, displaySched } = props;

  const setPositionList = (profArray) => {
    let positionLists = [];
    profArray?.forEach((prof) => positionLists.push(prof.position));
    const positionList = Array.from(new Set(positionLists));
    // console.log("positions", positionList)
    return positionList;
  };
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

  const positions = setPositionList(cowokerProfs);
  const groupedProfs = groupByPosition();

  return positions.map((position) => {
    return groupedProfs[position].map((prof, i) => {
      if (prof.position === position) {
        const schedsForOne = cowerkerScheds?.filter(
          //need to replace name to id
          (sched) => sched.name === prof.name
        );
        console.log("should be all scheds per person", schedsForOne)
        return (
          <React.Fragment key={`OtherScheds ${i}`}>
            <div className="WeeklyCal-Profiles" key={`profile ${i}`}>
              {i === 0 && (
                <div className="title" key={`position ${i}`}>
                  {prof.position}
                </div>
              )}
              <div className="profile" key={`profile ${i}`}></div>
              {prof.picture ? (
                <div key={`photo ${i}`}>{prof.picture}</div>
              ) : (
                <FaUserCircle fontSize="40px" key={`photoIcon ${i}`}/>
              )}
              <div key={`name ${i}`}>{prof.name}</div>
            </div>
            {displaySched(schedsForOne)}
          </React.Fragment>
        );
      }
    });
  });
};

export default DisplayOthersSched;
