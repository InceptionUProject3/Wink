import React from 'react'
import { ProfileIcon } from '../../../../Reusables/components/ProfileIcon';
// import ScheduleBar from '../../Reusables/components/ScheduleBar';

const MyDailySched = (props) => {
  const {mySched, positions, displaySched} = props;
  // console.log("mySched", mySched)
  const findColor = () => {
    const myPositionObj = positions?.find(
      (position) => mySched?.position === position.type
    );
    const color = myPositionObj?.color;
    return color;
  };

  return (
    
    <>
      <div className='profile-container my'>
        <ProfileIcon profile={mySched} color={findColor()}/>
        <div className='name'>{mySched?.firstname}, {mySched?.lastname} (me)</div>
      </div>
     
      <div className="schedules-container my">

      {displaySched(mySched?.schedules,mySched?.userId)}
      </div>
    </>
  
  )
}

export default MyDailySched