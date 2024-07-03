import React, { useContext } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'
import LoadingPage from './LoadingPage'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import AccountNav from '../AccountNav'
import ProfilePage from './ProfilePage'


const Account = () => {
    const {ready,user,setUser} = useContext(UserContext)
    const navigate = useNavigate()
    let {subpage} = useParams()
    console.log(subpage)
    if(subpage === undefined)
      subpage = 'account'
    console.log(subpage) 

    //Logout Function
    const logOut = async()=>{
      await axios.post('/logout')
      setUser(null)
      navigate('/')
      
    }

    //Classes definition
   
    // console.log(ready,user)
    if(!ready)
        return <LoadingPage/>
    if(ready && !user)
        return <Navigate to = {'/login'}/>
  return (
    <div >
      <AccountNav/>
         {
          subpage === "account" && (
            <ProfilePage user={user} logOut={logOut}/>
          )
         }
         {
          subpage === "places" && (
            <PlacesPage/>
          )
         }
    </div>
  )
}

export default Account