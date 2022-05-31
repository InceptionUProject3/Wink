import React from 'react'

const DisplayMySched = (props) => {
  const {myProfile, mySched, displaySched} = props;

  return (
    <>
    <div className="myProfile">
        <div>{myProfile?.name}</div>
        <div>{myProfile?.position}</div>
        <div>Me</div>
      </div>
      {mySched && displaySched(mySched)}
    </>
  )
}

export default DisplayMySched