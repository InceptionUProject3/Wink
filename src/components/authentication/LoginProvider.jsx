import React, { createContext, useEffect, useState } from 'react'

export const LoginContext = createContext()

const LoginProvider = (props) => {
const [user, setUser] = useState(null)
// const [loggedInUser, setLoggedInUser] = useState(null)

const [loading, setLoading] = useState(true)
const finishLogin = (newUser) => {

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


const logout = () => {
    setUser(null)
    
}
    const children = props.children
    const theValues = {user, finishLogin, logout, loading};
  return (
    <LoginContext.Provider value={theValues}>
        {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider