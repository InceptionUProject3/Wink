import React, { createContext, useEffect, useState } from 'react'

export const LoginContext = createContext()

const LoginProvider = (props) => {
const [user, setUser] = useState(null)
const [token, setToken] = useState(null)
const [loading, setLoading] = useState(true)
const finishLogin = (newUser) => {

    setUser(newUser)
    setToken(newUser.token)
    localStorage.setItem('user', JSON.stringify(newUser))
    localStorage.setItem('token', newUser.token)
}
useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    if (token) {
        setToken(token)
        setUser(user)
        setLoading(false);
        console.log('user is logged in', user)
    }
}
, [])


const logout = () => {
    setUser(null)
    setToken(null)
}
    const children = props.children
    const theValues = {user, token, finishLogin, logout, loading};
  return (
    <LoginContext.Provider value={theValues}>
        {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider