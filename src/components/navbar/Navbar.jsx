import React, { useContext } from "react";
import "./NavBar.css";
import wink from "../../images/wink.logo.png";
import AuthContext from "../authentication/AuthContext";


const Navbar = () => {
  const authContext = useContext(AuthContext);
  const loggedInUser = authContext.login;
  return (
    <div className="navbar">
      <div className="container">
        <h1>
        <img className="wink" src={wink} alt="" width="50"/>
        </h1>
        <ul>
          <li>
            <p>
              <a className="menu" href="/">
                HOME
              </a>
            </p>
          </li>
          <li>
            <p>
              <a className="menu" href="/messaging">
                MESSAGING
              </a>
            </p>
          </li>
          <li>
            <p>
              <a className="menu" href="/">
                CALENDAR
              </a>
            </p>
          </li>
          <li>
            <p>
              <a className="menu" href="/">
                TRAINING
              </a>
            </p>
          </li>
          <li>
            <p>
              <div> {!loggedInUser && (
              
              <a href="/login">
                <button className="btn" >
                  Login
                </button>
              </a>
              )}
              {loggedInUser && (
              
              <a href="/logout">
                <button className="btn" >
                  Logout
                </button>
              </a>
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