import React from "react";
import { FaCircle } from "react-icons/fa";

export const ProfileIcon = (props) => {
  const { profile, color } = props;

  return (
    <>
      <div className="icon">
        <p>{profile?.position.charAt(0)}</p>
        <FaCircle color={color}/>
      </div>
      <div>{profile?.position}</div>
    </>
  );
};
