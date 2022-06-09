/** Import resorces and works as a "tools" to produce the file. */

import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/muiTheme'

/**  UI allowing the user to login to the app with their email and password. */
const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const login = authContext.login;
  // default 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


/** Post username/password to the authentication service */
  const onFormSubmit = async () => {
    const user = { username: username, password: password };
    const data = JSON.stringify(user);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer' + login,
      },
      body: data,
    });

    
    if (response.status === 200) {
      const userData = await response.text();
      login(userData);
      navigate("/");
      console.log(userData);
    } else {
      alert("Login Failed");
    }
  };

  return (
    <Container sx={{ mt: 10 }}>
        <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        mb={3}
        sx={{ width: "50%", margin: "auto" }}
      >
        <TextField
          label="Username"
          variant="standard"
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        
        <Button variant="contained" onClick={() => onFormSubmit()} >
          Login
        </Button>
        
      </Box>
      </ThemeProvider>
    </Container>
  );
};

export default LoginForm;