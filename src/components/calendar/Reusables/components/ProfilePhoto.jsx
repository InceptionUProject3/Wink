import React from "react";
import { FaUserCircle } from "react-icons/fa";

export const ProfilePhoto = (props) => {
  const { profile } = props;

  return (
    <>
      {profile?.picture ? (
        <div>{profile.picture}</div>
      ) : (
        <FaUserCircle fontSize="2rem" />
      )}
    </>
  );
};
