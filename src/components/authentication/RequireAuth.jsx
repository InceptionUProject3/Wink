import React from "react";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  let auth = useContext(AuthContext);

  if (!auth.user) {
    //If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  return children;
}

export default RequireAuth;