import React, { useEffect, useState } from "react";
import { ProfileIcon } from "../../Reusables/components/ProfileIcon";
// import { ProfilePhoto } from "../../Reusables/components/ProfilePhoto";

const DisplayOthersSched = (props) => {
  const { cowokerProfs, displaySched, positions } = props;

  const [groupedProfs, setGroupedProfs] = useState();
  useEffect(() => {
    const groupByPosition = () => {
      const initialVal = {};
      return cowokerProfs?.reduce((acc, current) => {
        if (!acc[current.position]) {
          acc[current.position] = [];
        }

        acc[current.position].push(current);
        return acc;
      }, initialVal);
    };
    const groupedObj = groupByPosition();
    setGroupedProfs(() => groupedObj);
  }, [cowokerProfs]);


  return (
    <>
      {positions?.map((position, i) => {
        const empInPositon = groupedProfs && groupedProfs[position.position];
        if (empInPositon) {
          return empInPositon?.map((emp, index) => {
            // console.log(emp)
            return (
              <React.Fragment key={`OtherScheds ${i}`}>
                <div
                  className="WeeklyCal-Profiles others"
                  key={`profile ${i} ${index}`}
                >
                  {index === 0 && (
                    <div className="title" key={`position ${i}`}>
                      <ProfileIcon profile={emp} color={position.color} />
                      <div className="name">{position.position}</div>
                    </div>
                  )}
                  <div className="profile" key={`profile ${index}`}>
                    <div key={`name ${index}`} className="Name-container">
                      <div className="firstname">{emp.firstname},</div>
                      <div className="lastname">{emp.lastname}</div>
                    </div>
                  </div>
                </div>
                {displaySched(emp.schedules)}
              </React.Fragment>
            );
          });
        }
      })}
    </>
  );
};

export default DisplayOthersSched;
