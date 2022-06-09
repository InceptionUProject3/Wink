import { createContext } from "react";
/* Creates a Context object. 
When React renders a component that subscribes 
to this Context object it will read the current context value 
from the closest matching Provider above it in the tree. */

const AuthContext = createContext({
  loading: false,
  loggedInUser: null,
  token: null,
  login: () => {},
  logout: () => {},
});
/* This feature is called object destructuring and allows
 you to take properties of an object and store them conveniently into a variable. */


export default AuthContext;
// It's part of the ES6 module system thats defines a default export.