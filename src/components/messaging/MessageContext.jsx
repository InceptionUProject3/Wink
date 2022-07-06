import socketClient from "socket.io-client";
import React, { createContext, useEffect, useState, useContext } from "react";
import { LoginContext } from "../authentication/LoginProvider";
import { StoreContext } from "../authentication/StoreProvider";


// const authContext = useContext(LoginContext);

const SERVER = "http://localhost:4000";

export const MessageContext = createContext({});



const MessageProvider = (props) => {
    const storeContext = useContext(StoreContext);
    // const user = storeContext.store;
  const [socketRef, setSocketRef] = useState(null);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    console.log("useEffect");
    const socket = socketClient(SERVER);
    setSocketRef(socket);
    socket.on("connect", () => {
      console.log(`I'm connected with the back-end`);
     
    });
    socket.on("disconnect", () => {
        console.log(`I'm disconnected with the back-end`);
    })
    return () => {
        socket.removeAllListeners();
        socket.disconnect();
    }}
    , []);

    useEffect(() => {
        if (storeContext.store && socketRef) {
      console.log( "socket join", storeContext.store.User_idUser);
      socketRef.emit("join", storeContext.store.User_idUser);
    }},
    [storeContext.store, socketRef]);
    

    // useEffect(() => {
    //     setUser(storeContext.store)
    //     console.log("emmit user", user)
    //     if (user) {
    //     socketRef.emit("user", (user) => {
    //         console.log("emmit", user);
    //     }
    //     );
    // }}
    // , [storeContext.store, socketRef]);

    
    //   socket.on("receiver messages", (data) => {"
    //   setSocketRef(socket);
    //   }, []));    ;
    const children = props.children;
    const theValues = { socketRef };
    return (
      <MessageContext.Provider value={theValues}>
        <div>hey look at me :P</div>
        {children}
      </MessageContext.Provider>
    );
  
};

export default MessageProvider;
