
import React, { useEffect, useState } from "react"; 
// {useState} It’s a function exposed by react itself. Import it in components.
// {useEffect} The Effect Hook lets you perform side effects in function components.

import AuthContext from "./AuthContext"; 
// It's a form to link one file to another.

const AuthProvider = (props) => {
  const children = props.children;
  const [loggedInUser, setLoggedInUser] = useState();
  const [loading, setLoading] = useState(true);
/* This feature is called object destructuring and allows
 you to take properties of an object and store them conveniently into a variable. */

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
/* For fetching data, Use useEffect and pass [] as a second argument to make sure it fires only on initial mount.*/

  const login = (user) => {
    setLoggedInUser(user);
  };

  const logout = () => {
    setLoggedInUser(null);
  };
/* Function Expression is very similar to function declaration. 
    The differences are:
    1. Assign the function to a variable and execute the function by using the variable name. 
    2. Function name may be omitted.*/
  
  console.log(`logged in user is ${JSON.stringify(loggedInUser)}`);
/* Show the result instantally */

  const values = { login, logout, loggedInUser, loading };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
// 

export default AuthProvider;
// It's part of the ES6 module system thats defines a default export