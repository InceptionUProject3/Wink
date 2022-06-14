import React from 'react'
import { ProfileIcon } from '../../Reusables/components/ProfileIcon';

const MyDailySched = (props) => {
  const {mySched, positions} = props;
  // console.log("mySched", mySched)
  const findColor = () => {
    const myPositionObj = positions?.find(
      (position) => mySched?.position === position.position
    );
    const color = myPositionObj?.color;
    return color;
  };

  return (
    <div>
      <div className='Myprofile-container'>
        <ProfileIcon profile={mySched} color={findColor()}/>
        <div>{mySched?.firstname}, {mySched?.lastname}</div>
      </div>
      
    </div>
  )
}

export default MyDailySched