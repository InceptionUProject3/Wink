import React from 'react'

const DisplayOthersSched = (props) => {
    const {cowokerProfs, cowerkerScheds, displaySched} = props;


    const setPositionList = (profArray) => {
        let positionLists = [];
        profArray?.forEach((prof) => positionLists.push(prof.position));
        const positionList = Array.from(new Set(positionLists));
        // console.log("positions", positionList)
        return positionList;
      };

    const positions = setPositionList(cowokerProfs);
    return positions.map((position) => {
      return cowokerProfs?.map((prof) => {
        if (prof.position === position) {
          const schedsForOne = cowerkerScheds?.filter(
            (sched) => sched.name === prof.name
          );
          return (
            <>
              <div className="coworker-profile">
                <div>{prof.name}</div>
                <div>{prof.position}</div>
              </div>
              {displaySched(schedsForOne)}
            </>
          );
        }
      });
    });
  
}

export default DisplayOthersSched