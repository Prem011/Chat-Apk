import React, { createContext, useContext, useState } from 'react'
import Cookies from "js-cookie"
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    //get the cookies from the server with help of Cookies.get()
    //ChatApp from the signup localstorage
    const initialState = Cookies.get("jwt") || localStorage.getItem("ChatApp")

    // parse the user data and storing in state
    const [authUser, setauthUser] = useState(initialState ? JSON.parse(initialState) : undefined)


  return (
    <AuthContext.Provider value={[authUser, setauthUser]} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

//creating our own hook useAuth() so we can use the AuthProvider context in other 
export const useAuth=()=> useContext(AuthContext);  

