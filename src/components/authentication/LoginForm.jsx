/** Import resorces from files. It work as a "tools" to produce the functionality of the app. */
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

/** Post username/password to the authentication service. */
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

// Condition of the fucntion.
    if (response.status === 200) {
<<<<<<< HEAD
      const userData = await response.text();
      login(userData);
      navigate("/");
      console.log(userData);
=======
      console.log(response)
      const userData = JSON.parse(await response.text());
      authContext.finishLogin(userData);
      navigate("/selection");

>>>>>>> main
    } else {
      alert("Login Failed");
    }
  };

// Returns the result of function with a nice display.
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

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project LoginForm. */
export default LoginForm;
