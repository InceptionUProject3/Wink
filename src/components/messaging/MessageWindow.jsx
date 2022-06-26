import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../authentication/StoreProvider";
import { LoginContext } from "../authentication/LoginProvider";



const MessageWindow = () => {
    const authContext = useContext(LoginContext);
    const storeContext = useContext(StoreContext);
    const user = storeContext.store;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("interval");
        }, 10000);
        const getMessages = async () => {
            try {
                const chat = {
                    user: user.User_idUser,
                    store: user.Store_idStore,
                };
                console.log("sending message request: " + chat);
                data = JSON.stringify(chat);
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
    <div>MessageWindow</div>
  )
}

export default MessageWindow