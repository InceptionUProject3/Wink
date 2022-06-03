import React from "react";
import "./NavBar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <h1>WINK SYSTEM</h1>
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
              <a href="/login">
                <button className="btn" href="/login">
                  Login
                </button>
              </a>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
