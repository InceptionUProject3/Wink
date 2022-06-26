import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../authentication/StoreProvider";
import { LoginContext } from "../authentication/LoginProvider";
import { List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";

const MessageWindow = () => {
  const authContext = useContext(LoginContext);
  const storeContext = useContext(StoreContext);
  const user = storeContext.store;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // const interval = setInterval(() => {
    //     console.log("interval");
    // }, 10000);

    const getMessages = async () => {
      try {
        const chat = {
          user: user.User_idUser,
          store: user.Store_idStore,
          receiver: 2,
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
          console.log("we have the messages", theMessages);
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
  }, [setInterval(() => {}, 10000)]);

  return (
    <Box sx={{ m: 20 }}>
      <List sx={{ width: 300, display: "flex", flexDirection: "column" }}>
        {messages ? (
          messages.map((message, index) => {
            console.log("this is the return message", message);
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
