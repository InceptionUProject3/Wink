import React from "react";
import { ProfileIcon } from "../../Reusables/components/ProfileIcon";
// import { ProfilePhoto } from "../../Reusables/components/ProfilePhoto";

const DisplayMySched = (props) => {
  const { myProfile,  displaySched, positions } = props;
 
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
          <ProfileIcon profile={myProfile} color={findColor()} />
          <div className="position">{myProfile?.position}</div>
        </div>
        <div className="Name-container">
          <div className="firstname">{myProfile?.firstname},</div>
          <div className="lastname">{myProfile?.lastname} (me)</div>
        </div>
      </div>
      { displaySched(myProfile?.schedules)}
    </>
  );
};

export default DisplayMySched;
