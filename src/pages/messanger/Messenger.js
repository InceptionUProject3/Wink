import React, { useContext, useState, useEffect } from "react";
import Message from "../../components/messaging/Message";
import MessageWindow from "../../components/messaging/MessageWindow";
import { LoginContext } from "../../components/authentication/LoginProvider";
import { StoreContext } from "../../components/authentication/StoreProvider";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Messenger = () => {
  const authContext = useContext(LoginContext);
  const storeContext = useContext(StoreContext);
  const user = storeContext.store;
  const location = useLocation();
  const [receiver, setReceiver] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //     if (location.state) {
  //         setReceiver(location.state.profile.User_idUser);
  //         console.log("logging location", location.state);
  //     }
  // }, [location.state]);

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 30vh)",

        marginTop: "20vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
      
          flexDirection: "row",
          marginTop: "0vh",
          marginBottom: "1vh",
          color: "#00b3b4",
          fontStyle: "bold",
          justifyContent: "flex-start",


        }}
      >
        {" "}
        <BiArrowBack style={{ position: "absolute", left: "0vw" 
      }}onClick={() => navigate("/coworkers")} size={40} />
        <h2 >  {location.state.profile.user.firstname}{" "}
        {location.state.profile.user.lastname}</h2>
        {/* {location.state.profile.user.firstname}{" "}
        {location.state.profile.user.lastname} */}
      </div>
      <MessageWindow
        setReceiver={location.state.profile.User_idUser}
        style={{ display: "flex" }}
      />
      <Message
        receiver={location.state.profile.User_idUser}
        style={{ marginBottom: "5vh" }}
      />
    </div>
  );
};

export default Messenger;
