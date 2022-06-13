import React from "react";
import { ProfileIcon } from "../../Reusables/components/ProfileIcon";
// import { ProfilePhoto } from "../../Reusables/components/ProfilePhoto";

const DisplayMySched = (props) => {
  const { myProfile, mySched, displaySched, positions } = props;
  // console.log(myProfile)
  const findColor = () => {
    const myPositionObj = positions?.find(
      (position) => myProfile?.position === position.position
    );
    const color = myPositionObj?.color;
    // console.log(color)
    return color;
  };
  return (
    <>
      <div className="WeeklyCal-Profiles myProfile">
        {/* <ProfilePhoto profile={myProfile} /> */}

        <div className="title">
          <ProfileIcon profile={myProfile} color={findColor()} />
          <div>{myProfile?.position}</div>
          <div className="Name-container">
            <div className="firstname">{myProfile?.firstname},</div>
            <div className="lastname">{myProfile?.lastname} (me)</div> 
          </div>
        </div>
      </div>
      {mySched && displaySched(mySched)}
    </>
  );
};

export default DisplayMySched;
