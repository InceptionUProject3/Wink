import React from 'react'
import { ProfileIcon } from '../../Reusables/components/ProfileIcon';
import ScheduleBar from '../../Reusables/components/ScheduleBar';

const MyDailySched = (props) => {
  const {mySched, positions, displaySched} = props;
  console.log("mySched", mySched)
  const findColor = () => {
    const myPositionObj = positions?.find(
      (position) => mySched?.position === position.position
    );
    const color = myPositionObj?.color;
    return color;
  };

  return (
    <div className='MyDaily'>
      <div className='Myprofile-container'>
        <ProfileIcon profile={mySched} color={findColor()}/>
        <div className='name'>{mySched?.firstname}, {mySched?.lastname}</div>
      </div>
      <div className='MySchduels'>
      {displaySched(mySched?.schedules)}
      </div>
    </div>
  )
}

export default MyDailySched