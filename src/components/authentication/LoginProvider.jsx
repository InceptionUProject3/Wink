import React, { createContext, useState } from 'react'

export const LoginContext = createContext()

const LoginProvider = (props) => {
const [user, setUser] = useState(null)
const [token, setToken] = useState(null)
const finishLogin = (newUser) => {
    console.log("finishlogin", (newUser))
    console.log("finishlogin2", (newUser.token))
    setUser(newUser)
    setToken(newUser.token)
}
const logout = () => {
    setUser(null)
    setToken(null)
}
    const children = props.children
    const theValues = {user, token, finishLogin, logout};
  return (
    <LoginContext.Provider value={theValues}>
        {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider