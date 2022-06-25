import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../authentication/StoreProvider";
import { LoginContext } from "../authentication/LoginProvider";
import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/muiTheme";

export const Message = () => {
  const authContext = useContext(LoginContext);
  const storeContext = useContext(StoreContext);
  const user = storeContext.store;
  const [receiver, setReceiver] = useState(null);
  const [message, setMessage] = useState("");

  
    const sendMessage = async (message) => {
      try {
        const chat = {
          sender: user.User_idUser,
          receiver: receiver,
          chat: message,
          store: user.Store_idStore,
        };
        console.log("sending message", chat);
        const data = JSON.stringify(chat);
        const response = await fetch("/api/createconversation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        });
        if (response.status === 200) {
          console.log(response);
          const theMessage = JSON.parse(await response.text());
          console.log("we have the message", theMessage);
        } else {
          console.log("failed to send message");
        }
      } catch (err) {
        console.log("error sending message", err);
      }
    };
    

  return ( <Container sx={{ mt: 10 }}>
  <ThemeProvider theme={theme}>
    <Box
      display="flex"
      flexDirection="column"
      mb={3}
      sx={{ width: "50%", margin: "auto" }}
    >
      <TextField
        label="Message"
        variant="standard"
        type="text"
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
       <Button variant="contained" onClick={() => sendMessage(message)}>
            Login
          </Button>
        </Box>
      </ThemeProvider>
    </Container>
    );
};

export default Message;
