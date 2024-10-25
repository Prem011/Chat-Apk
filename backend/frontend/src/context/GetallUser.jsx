import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import axios from 'axios'

const GetallUser = () => {
 const [allUsers, setallUsers] = useState([])
 const [loading, setloading] = useState(true)

 useEffect(()=>{
  const getUsers = async() => {
        setloading(true)
    try{
      const token = Cookies.get("jwt")
      // const response = await axios.get("http://localhost:5000/user/allusers", {
      const response = await axios.get("/api/user/allusers", {
        credentials : "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      setallUsers(response.data)
      // setloading(false)
    }
    catch(err){
      console.log("Error in GetallUser : " + err)
    }finally{
      setloading(false)
    }
  }
  getUsers()
 }, [])
 return[allUsers, loading]
}

export default GetallUser;
