import React from 'react'
import { FaUserCircle } from "react-icons/fa";

const DisplayMySched = (props) => {
  const {myProfile, mySched, displaySched} = props;

  return (
    <>
    <div className="WeeklyCal-Profiles" id="myProfile">
        {myProfile?.picture?<div>{myProfile.picture}</div>:<FaUserCircle fontSize="3rem"/>}
        <div>{myProfile?.name}</div>
        <div>{myProfile?.position}</div>
        <div>Me</div>
      </div>
      {mySched && displaySched(mySched)}
    </>
  )
}

export default DisplayMySched