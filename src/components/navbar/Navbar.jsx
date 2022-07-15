import React, { useContext, useState } from "react";
import "./NavBar.css";
import wink from "../../images/wink.logo.png";
import { Link, NavLink } from "react-router-dom";
import Notification from "../messaging/Notification";

import { LoginContext } from "../authentication/LoginProvider";
import { StoreContext } from "../authentication/StoreProvider";
import { Badge } from "@mui/material";
import theme from "../utils/muiTheme";
import { ThemeProvider } from "@mui/material/styles";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaRegTimesCircle } from "react-icons/fa";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const auth = useContext(LoginContext);
  const store = useContext(StoreContext);

  const loggedInUser = auth.user;
  const loggedInStore = store.store;
  const isAdmin =
    loggedInStore?.UserProfile_idUserProfile === 1000 ||
    loggedInStore?.UserProfile_idUserProfile === 1002;

  return (
    <div className="navbar">
      <div className="container">
        <ul>
          <h1>
            <img className="wink" src={wink} alt="" width="50" />
          </h1>
          <div>
            {loggedInUser && (
              <h4 className="navbar-welcome">
                Welcome {loggedInUser.firstname}
              </h4>
            )}
            {loggedInStore && loggedInUser && (
              <h4 className="navbar-welcome">
                <Link to="/selection">{loggedInStore.store.name}</Link>
              </h4>
            )}
          </div>
        </ul>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {loggedInUser && (
            <li>
              {" "}
              <ThemeProvider theme={theme}>
                <Badge
                  badgeContent={<Notification />}
                  color="primary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <p className="menu">
                    <NavLink
                      style={({ isActive }) => ({
                        borderBottom: isActive ? "#00b3b4 solid 2px" : "",
                        opacity: isActive ? 1 : "",
                      })}
                      to="/coworkers"
                      onClick={handleClick}
                    >
                      MESSENGER
                    </NavLink>
                  </p>
                </Badge>
              </ThemeProvider>
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
                  onClick={handleClick}
                >
                  CALENDAR
                </NavLink>
              </p>
            </li>
          )}

          {/* {loggedInUser && isAdmin && ( */}
          {loggedInUser && (
            <li>
              <p className="menu">
                <NavLink
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "#00b3b4 solid 2px" : "",
                    opacity: isActive ? 1 : "",
                  })}
                  to="/admin/schedule"
                  onClick={handleClick}
                >
                  SCHEDULE
                </NavLink>
              </p>
            </li>
          )}
          <li>
            <p>
              <div>
                {" "}
                {!loggedInUser && (
                  <Link to="/" onClick={handleClick}>
                    <button className="btn">Login</button>
                  </Link>
                )}
                {loggedInUser && (
                  <Link to="/logout" onClick={handleClick}>
                    <button className="btn">Logout</button>
                  </Link>
                )}
              </div>
            </p>
          </li>
        </ul>
        {loggedInUser && (
        <Badge
                  badgeContent={<Notification />}
                  color="primary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaRegTimesCircle className="icon" />
          ) : (
            <HiOutlineMenuAlt4 className="icon" />
          )}
        </div>
        </Badge>
        )}
        

      </div>
    </div>
  );
};

export default Navbar;
