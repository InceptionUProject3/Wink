import React from "react";
import { useContext } from "react";

import { Navigate } from "react-router-dom";
import { LoginContext } from "./LoginProvider";

function RequireAuth({ children }) {
  let auth = useContext(LoginContext);

  if (!auth.user && !auth.loading) {
    //If user is not logged in, redirect to login page
    return <Navigate to="/" />;
  }

  return children;
}

export default RequireAuth;