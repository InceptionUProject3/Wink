import React from 'react'
import { ProfileIcon } from '../../Reusables/components/ProfileIcon'

const ProfileBig = ({profile, positions}) => {
  const findColor = () => {
    const myPositionObj = positions?.find(
      (position) => profile?.position === position.position
    );
    const color = myPositionObj?.color;
    // console.log(color)
    return color;
  };

  return (
    <div className="WeeklyCal-Profiles myProfile">

        <div className="title">
          <div className="iconNme">
            <ProfileIcon profile={profile} color={findColor()} />
            <div className="me">me</div>
          </div>
          <div className="position">{profile?.position}</div>
        </div>
        <div className="Name-container">
          <div className="name">
            {profile?.firstname}, {profile?.lastname}
          </div>
        </div>
      </div>
  )
}

export default ProfileBig