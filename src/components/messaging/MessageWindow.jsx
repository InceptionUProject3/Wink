import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../authentication/StoreProvider";
import { LoginContext } from "../authentication/LoginProvider";
import {
    List,
    ListItem,
    ListItemText,
    
  } from "@mui/material";



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
                    console.log("we have the message", theMessages);
                } else {
                    console.log("failed to get message");
                    setMessages([]);
                }
            }
            catch (err) {
                console.log("error getting message", err);
            }
        }
        getMessages(user);
    }, [setInterval(() => {
        console.log("interval");
    }, 10000)]);



  return (
    <List sx={{ width: 300, display: "flex", flexDirection: "column" }}>
        {messages.map((message, index) => {
            return (
                <ListItem key={index}>
                    <ListItemText primary={message.chat} />
                </ListItem>
            );
        }
        )}
    </List>
  )
}

export default MessageWindow