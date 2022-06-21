import React from "react";
import { ProfileIcon } from "../../Reusables/components/ProfileIcon";
// import { ProfilePhoto } from "../../Reusables/components/ProfilePhoto";

const DisplayMySched = (props) => {
  const { myProfile, displaySched, positions } = props;

  // console.log(myProfile)
  const findColor = () => {
    const myPositionObj = positions?.find(
      (position) => myProfile?.position === position.position
    );
    const color = myPositionObj?.color;
    // console.log(color)
    return color;
  };
  // console.log('my schedules', myProfile?.schedules)
  return (
    <>
      <div className="WeeklyCal-Profiles myProfile">
        {/* <ProfilePhoto profile={myProfile} /> */}

        <div className="title">
          <div className="iconNme">
            <ProfileIcon profile={myProfile} color={findColor()} />
            <div className="me">me</div>
          </div>
          <div className="position">{myProfile?.position}</div>
        </div>
        <div className="Name-container">
          <div className="name">
            {myProfile?.firstname}, {myProfile?.lastname}
          </div>
        </div>
      </div>
      {displaySched(myProfile?.schedules)}
    </>
  );
};

export default DisplayMySched;
