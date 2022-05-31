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
    
        return groupedProfs[position].map((prof, index) => {
          if (prof.position === position) {
            const schedsForOne = cowerkerScheds?.filter(
              //need to replace name to id
              (sched) => sched.name === prof.name
            );
            return (
              <>
                <div className="WeeklyCal-Profiles">
                  {index===0&&<div className="title">{prof.position}</div>}
                  {prof.picture?<div>{prof.picture}</div>:<FaUserCircle fontSize="3rem"/>}
                  <div>{prof.name}</div>
                </div>
                {displaySched(schedsForOne)}
              </>
            );
          }
        })
      
  });
}

export default DisplayOthersSched;
