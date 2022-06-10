/** {useState} It’s a function exposed by react itself. Import it in components.
{useEffect} The Effect Hook lets you perform side effects in function components. */
import React, { useEffect, useState } from "react"; 

/** It's a form to link one file to another. */
import AuthContext from "./AuthContext"; 

/** The authProvider methods must return a Promise. */
const AuthProvider = (props) => {
  const children = props.children;
  const [loggedInUser, setLoggedInUser] = useState();
  const [loading, setLoading] = useState(true);

/** For fetching data, Use useEffect and pass [] as a second argument to make sure it fires only on initial mount. */
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/loggedInUser");
      const userData = await response.json();
      setLoggedInUser(userData);
      setLoading(false);
      console.log(userData);
    };
    getUser();
  }, []);


/** Const Login. */
  const login = (user) => {
    setLoggedInUser(user);
  };

/**Const Logout. */
  const logout = () => {
    setLoggedInUser(null);
  };

/* Show the result instantally. */  
  console.log(`logged in user is ${JSON.stringify(loggedInUser)}`);

/** Values contents in the function. */
  const values = { login, logout, loggedInUser, loading };

/** Returns the of the contents linked with AuthContext. */
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project AuthProvider. */
export default AuthProvider;