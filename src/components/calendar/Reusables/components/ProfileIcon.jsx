import React from "react";
import './profileIcon.css'
import { FaCircle } from "react-icons/fa";

export const ProfileIcon = (props) => {
  const { profile, color } = props;

  return (
    <>
      <div className="icon">
        <p className="initial">{profile?.position.charAt(0)}</p>
        <FaCircle color={color} width="2rem" height="2rem"/>
      </div>
      {/* <div>{profile?.position}</div> */}
    </>
  );
};
