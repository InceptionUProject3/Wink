/** Import resorces from files. It work as a "tools" to produce the functionality of the app. */
import React, { createContext, useEffect, useState } from 'react'


/** Export const LoginContext */
export const LoginContext = createContext()

/** UI allowing the user to login to the app with their token. */
const LoginProvider = (props) => {

// default to "" because <input> needs a non-null value
const [user, setUser] = useState(null)
// const [loggedInUser, setLoggedInUser] = useState(null)

const [loading, setLoading] = useState(true)
const finishLogin = (newUser) => {

  // call setUser and setToken
    setUser(newUser)
    // setLoggedInUser(newUser)

}

useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/loggedInUser");
      const userData = await response.json();
      setUser(userData);
      setLoading(false);
      console.log(userData);
    };
    getUser();
  }, []);

/**  UI allowing the user to logout from account. */
const logout = () => {
    setUser(null)
    
}
    const children = props.children
    const theValues = {user, finishLogin, logout, loading};

  // Returns the result of value from LoginContext.Provider.
  return (
    <LoginContext.Provider value={theValues}>
        {children}
    </LoginContext.Provider>
  )
}

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project LoginProvider. */
export default LoginProvider
