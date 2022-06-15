/** Import resorces from files. It work as a "tools" to produce the functionality of the app. */
import React from "react";
import './profileIcon.css'
import { FaCircle } from "react-icons/fa";



export const ProfileIcon = (props) => {
  const { profile, color } = props;

  /** Returns the result of class such as: Icon/Initial. */
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
