/** Import resorces from files, app and ruoter. It work as a "bridge" to produce the functionality of the app. */
import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "./LoginProvider";

/**  UI allowing the user to keep in the page. */
function RequireAuth({ children }) {
  let auth = useContext(LoginContext);

  //If user is not logged in, redirect to login page.
  if (!auth.user && !auth.loading) {
    return <Navigate to="/login" />;
  }
  // Returns the result of value from children.
  return children;
}

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project RequireAuth. */
export default RequireAuth;
