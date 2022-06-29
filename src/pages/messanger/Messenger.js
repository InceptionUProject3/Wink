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
    <div>messenger

        <MessageWindow setReceiver={location.state.profile.User_idUser}/>
    <Message receiver={location.state.profile.User_idUser} />

    </div>
  )
}

export default Messenger