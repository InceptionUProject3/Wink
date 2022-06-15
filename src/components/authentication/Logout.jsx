/** Import resorces from files. It work as a "tools" to produce the functionality of the app. */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginProvider";

/** The Location methods must return a Promise. */
const Logout = () => {
  const authContext = useContext(LoginContext);

/** The Location methods must return a Promise. */
  const logout = authContext.logout;

/** The Location methods must return a Promise. */
  const navigate = useNavigate();
  useEffect(() => {
    const logoutUser = async () => {
        console.log("logging out");
      const response = await fetch("/api/logout");
      if (response.status === 200) {
        logout();
        navigate("/");
      } else {
        console.log("error logging out", response);
        alert("logout failed");
        navigate("/");
      }
    };
    logoutUser();
  }, [logout, navigate]);

  return null;
};

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project Logout. */
export default Logout;