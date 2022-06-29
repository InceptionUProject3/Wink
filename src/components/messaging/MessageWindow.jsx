import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../authentication/StoreProvider";
import { LoginContext } from "../authentication/LoginProvider";
import { List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";



const MessageWindow = () => {
  const authContext = useContext(LoginContext);
  const storeContext = useContext(StoreContext);
  const user = storeContext.store;
  const [messages, setMessages] = useState([]);
 const [receiver, setReceiver] = useState("");
  const [seconds, setSeconds] = useState(0);
  const location = useLocation();
  

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      // console.log(seconds);
      // console.log("receiver is", location.state.profile.User_idUser);
    }, 5000);
    
  }, []);


  useEffect(() => {
    
    const getMessages = async () => {
     
      try {
        const chat = {
          user: user.User_idUser,
          store: user.Store_idStore,
          receiver: location.state.profile.User_idUser,
        };
        console.log("sending message request: " + chat);
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
        } else {
          console.log("failed to get message");
          setMessages([]);
        }
      } catch (err) {
        console.log("error getting message", err);
      }
    };
    getMessages(user);
  }, [seconds]);

  return (
    <Box sx={{ m: 20 }}>
      <List sx={{ width: 300, display: "flex", flexDirection: "column" }}>
        {messages ? (
          messages.map((message, index) => {
            // console.log("this is the return message", message);
            return (
              <ListItem key={index}>
                <ListItemText primary={message.chat} />
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
  );
};

export default MessageWindow;
