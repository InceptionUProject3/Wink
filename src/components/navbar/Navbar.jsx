import React, { useContext } from "react";
import "./NavBar.css";
import wink from "../../images/wink.logo.png";
import { Link } from "react-router-dom";

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
              <p>
                <Link className="menu" to="/home">
                  HOME
                </Link>
              </p>
            </li>
          )}
          {loggedInUser && (
            <li>
              <p>
                <Link className="menu" to="/messaging">
                  MESSAGING
                </Link>
              </p>
            </li>
          )}
          {loggedInUser && (
            <li>
              <p>
                <Link className="menu" to="/calendar">
                  CALENDAR
                </Link>
              </p>
            </li>
          )}
          {loggedInUser && (
            <li>
              <p>
                <Link className="menu" to="/">
                  TRAINING
                </Link>
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
                  <button className="btn">
                    Logout
                  </button>
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
