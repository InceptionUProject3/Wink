import React from "react";
import { ProfileIcon } from "../../Reusables/components/ProfileIcon";
// import { ProfilePhoto } from "../../Reusables/components/ProfilePhoto";

const DisplayMySched = (props) => {
  const { myProfile, mySched, displaySched,positions } = props;
  // console.log(mySched)
  const findColor =()=>{
    const myPositionObj = positions?.find((position)=>myProfile?.position===position.position);
    const color = myPositionObj?.color;
    // console.log(color)
    return color
    
  }
  return (
    <>
      <div className="WeeklyCal-Profiles myProfile">
        {/* <ProfilePhoto profile={myProfile} /> */}

        <div className="title">
          <ProfileIcon profile={myProfile} color={findColor()}/>
        <div>{myProfile?.firstname}, {myProfile?.lastname}(me)</div>
        </div>
      </div>
      {mySched && displaySched(mySched)}
    </>
  );
};

export default DisplayMySched;
