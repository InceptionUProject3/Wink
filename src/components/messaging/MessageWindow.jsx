import React, { useContext, useState, useEffect, useRef } from "react";
import { StoreContext } from "../authentication/StoreProvider";
import { LoginContext } from "../authentication/LoginProvider";
import { MessageContext } from "./MessageContext";
import { List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";
import theme from "../utils/muiTheme";
import { ThemeProvider } from "@mui/material/styles";

import { AiFillCheckCircle } from "react-icons/ai";


const MessageWindow = () => {
  const authContext = useContext(LoginContext);
  const storeContext = useContext(StoreContext);
  const socket = useContext(MessageContext).socketRef;

  const user = storeContext.store;
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [seconds, setSeconds] = useState(0);
  const location = useLocation();
  const [notification, setNotification] = useState(false);
  const bottomRef = useRef(null);


  useEffect(() => {
    socket.on("notification", (data) => {
      console.log("received notification", data);
      setNotification(true);
    });
  }, []);
console.log(notification);
  useEffect(() => {
    
    const getMessages = async () => {
      try {
        const chat = {
          user: user.User_idUser,
          store: user.Store_idStore,
          receiver: location.state.profile.User_idUser,
        };
        console.log("sending message request: ", chat);
        const data = JSON.stringify(chat);
        const response = await fetch("/api/getconversation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        });
        if (response.status === 200) {
          console.log(response);
          const theMessages = JSON.parse(await response.text());
          // console.log("we have the messages", theMessages);
      
          setMessages(theMessages);
          setNotification(false);
          socket.emit("chat", chat);
        } else {
          console.log("failed to get message");
          setMessages([]);
        }
      } catch (err) {
        console.log("error getting message", err);
      }
    };
    getMessages(user);
  }, [notification]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [notification, messages]);


  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <List
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflowY: "scroll",
            marginTop: "2%",
            marginBottom: "2%",
            overflowX: "hidden",
          }}
          align="right"
          justifyContent="right"
          style={{ border: "red" }}
        >
          {messages ? (
            messages.map((message, index) => {
              // console.log("this is the return message", message);
              return message.sender === user.User_idUser ? (
                <ListItem key={index}>
        
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        border: "1px solid #00b3b4",
                        borderRadius: 10,
                        padding: 10,
                        maxWidth: "50%",
                        overflow: "wrap",
                        backgroundColor: "#00b3b4",
                        color: "white",
                      }}
                    >
                      {message.chat}
                    </div>
                    <div>
                    {message.read_receits === true ? (
                      <AiFillCheckCircle
                        style={{
                          color: "#00b3b4",
                          marginLeft: "1%",
                          marginTop: "1%",
                          marginBottom: "1%",
                        }}
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div ref={bottomRef} />
                  </div>
                </ListItem>
              ) : (
                <ListItem key={index}>
                  
                  <div
                    style={{
                      border: "1px solid #00b3b4",
                      borderRadius: 10,
                      padding: 10,
                      maxWidth: "50%",
                      color: "#00b3b4",
                      overflow: "wrap",
                    }}
                  >
                    {message.chat}
                  </div>
                 
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <ListItemText primary="No coworkers found" />
            </ListItem>
          )}
        </List>
      </Box>
    </ThemeProvider>
  );
};

export default MessageWindow;
