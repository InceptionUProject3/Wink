import React, { createContext, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginProvider";
import Location from "./Location";

export const StoreContext = createContext();

const StoreProvider = (props) => {
  const authContext = useContext(LoginContext);
  const user = authContext.user;
  const [selectedProfile, setSelectedProfile] = useState([]);
  const navigate = useNavigate();
  let userToSend = JSON.stringify(user);
  useEffect(() => {
    const getStore = async () => {
      console.log("sending userId: " + userToSend);
      const response = await fetch("/api/storeselection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userToSend,
      });
      const userData = JSON.parse(await response.text());
      console.log(response);
      setSelectedProfile(userData);
      console.log("we have the user data", userData);
    };
    getStore(userToSend);
  }, [userToSend]);
  // const children = props.children
  // const theValues = {selectedProfile};
  // const profiles = () => {Object.keys(selectedProfile).map(key => {
  //   console.log("the keys are", key);
  //   console.log(selectedProfile[key]);
  //   return <div>{selectedProfile[key]}</div>
  // }
  // )};
  const profiles = (profile) => {
    setSelectedProfile(profile);
    navigate("/home");
    console.log("the selected profile is", profile);
  }

  return (
    <div>
      {selectedProfile ? (
        selectedProfile.map((profile, index) => {
          return<button onClick={ () => {profiles(profile)}}><Location selectedProfile={profile} /></button>;
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>

  );
};

export default StoreProvider;


