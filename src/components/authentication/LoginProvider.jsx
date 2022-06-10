/** Import resorces from files. It work as a "tools" to produce the functionality of the app. */
import React, { createContext, useState } from 'react'


/** Export const LoginContext */
export const LoginContext = createContext()

/** UI allowing the user to login to the app with their token. */
const LoginProvider = (props) => {

// default to "" because <input> needs a non-null value
const [user, setUser] = useState(null)
const [token, setToken] = useState(null)
const finishLogin = (newUser) => {

  // call setUser and setToken
    setUser(newUser)
    setToken(newUser.token)
}

/**  UI allowing the user to logout to the app with their token. */
const logout = () => {
    setUser(null)
    setToken(null)
}
    const children = props.children
    const theValues = {user, token, finishLogin, logout};

  // Returns the result of value from LoginContext.Provider.
  return (
    <LoginContext.Provider value={theValues}>
        {children}
    </LoginContext.Provider>
  )
}

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project LoginProvider. */
export default LoginProvider