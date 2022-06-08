import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const Logout = () => {
  const authContext = useContext(AuthContext);

  const logout = authContext.logout;

  const navigate = useNavigate();
  useEffect(() => {
    const logoutUser = async () => {
      // const response = await fetch("/api/logout");
      // if (response.status === 200) {
        logout();
        navigate("/login");
      // } else {
      //   alert("logout failed");
      //   navigate(-1);
      // }
    };
    logoutUser();
  }, [logout, navigate]);

  return null;
};

export default Logout;