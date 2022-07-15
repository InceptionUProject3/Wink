import React from "react";
import "./style/profileIcon.css";
import { FaCircle } from "react-icons/fa";

export const ProfileIcon = (props) => {
  const { profile, color} = props;
  // console.log('props', profile, color)
  return (
    <>
      <div className="icon" >
        <p className="initial" >
          {typeof profile?.position ==='string'
            ? profile?.position?.charAt(0)
            : profile?.position?.type.charAt(0)}
        </p>
        <FaCircle color={color} width="2rem" height="2rem" />
      </div>
    </>
  );
};
