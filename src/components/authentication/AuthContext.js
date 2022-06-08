
import { createContext } from "react";
const AuthContext = createContext({
  loading: false,
  loggedInUser: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;