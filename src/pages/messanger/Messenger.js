import React, { useContext, useState, useEffect } from "react";
import Message from "../../components/messaging/Message";
import MessageWindow from "../../components/messaging/MessageWindow";
import { LoginContext } from "../../components/authentication/LoginProvider";
import { StoreContext } from "../../components/authentication/StoreProvider";
import { useLocation } from "react-router-dom";

const Messenger = () => {
  const authContext = useContext(LoginContext);
  const storeContext = useContext(StoreContext);
  const user = storeContext.store;
  const location = useLocation();
  const [receiver, setReceiver] = useState("");

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
        height: "80vh",
        marginTop: "10vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <MessageWindow
        setReceiver={location.state.profile.User_idUser}
        style={{ display: "flex", height: "80vh" }}
      />
      <Message
        receiver={location.state.profile.User_idUser}
        style={{ position: "absolute", marginBottom: "20px" }}
      />
    </div>
  );
};

export default Messenger;
