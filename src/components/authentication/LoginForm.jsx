import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/muiTheme';
import { LoginContext } from "./LoginProvider";






const LoginForm = () => {
  const authContext = useContext(LoginContext);

  // const login = authContext.login;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = async () => {
    const user = { username: username, password: password };
    const data = JSON.stringify(user);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer' + user,
      },
      body: data,
    });

    if (response.status === 200) {
      console.log(response)
      const userData = JSON.parse(await response.text());
      authContext.finishLogin(userData);
      navigate("/selection");

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