import React, { useContext } from "react";
import "./NavBar.css";
import wink from "../../images/wink.logo.png";
import { Link, NavLink } from "react-router-dom";

import { LoginContext } from "../authentication/LoginProvider";

const Navbar = () => {
  const auth = useContext(LoginContext);

  const loggedInUser = auth.user;
  // const loading = auth.loading;
  return (
    <div className="navbar">
      <div className="container">
        <h1>
          <img className="wink" src={wink} alt="" width="50" />
        </h1>
        <ul>
          {loggedInUser && (
            <li>
              <p className="menu">
                <NavLink
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "#00b3b4 solid 2px" : "",
                    opacity: isActive ? 1 : "",
                  })}
                  to="/home"
                >
                  HOME
                </NavLink>
              </p>
            </li>
          )}
          {loggedInUser && (
            <li>
              <p className="menu">
                <NavLink
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "#00b3b4 solid 2px" : "",
                    opacity: isActive ? 1 : "",
                  })}
                  to="/messaging"
                >
                  MESSAGING
                </NavLink>
              </p>
            </li>
          )}
          {loggedInUser && (
            <li>
              <p className="menu">
                <NavLink
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "#00b3b4 solid 2px" : "",
                    opacity: isActive ? 1 : "",
                  })}
                  to="/calendar"
                >
                  CALENDAR
                </NavLink>
              </p>
            </li>
          )}
          {loggedInUser && (
            <li>
              <p className="menu">
                <NavLink
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "#00b3b4 solid 2px" : "",
                    opacity: isActive ? 1 : "",
                  })}
                  to="/"
                >
                  TRAINING
                </NavLink>
              </p>
            </li>
          )}

          <li>
            <p>
              <div>
                {" "}
                {!loggedInUser && (
                  <Link to="/">
                    <button className="btn">Login</button>
                  </Link>
                )}
                {loggedInUser && (
                  <Link to="/logout">
                    <button className="btn">Logout</button>
                  </Link>
                )}
              </div>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;