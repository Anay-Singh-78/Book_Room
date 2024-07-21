import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export const UserContextProvider = ({children})=>{
    const [user,setUser] = useState(null)
    const [ready,setReady] = useState(false)
    const [showToast,setShowToast] = useState(false)
    const [showRegisterToast,setShowRegisterToast] = useState(false)
    // const fetchProfile = async()=>{
    //     try{
    //         const response = await axios.get('/profile')
    //     }
    //     catch(err){
    //         if(err.response && err.response.status === 401){
    //             console.log("Anay Singh")
    //         return;
    //         }
    //     }
    // }
    useEffect(()=>{
        try{
            // console.log("hii")

            axios.get('/profile')
            .then((response) => {
                try {
                    setReady(true);
                    if (response.data === null)
                        return;
                    setUser(response.data.userData);
                } catch (error) {
                    console.error('Error processing the response:', error);
                }
            })
            .catch((error) => {
                console.error('Error fetching the profile:', error);
            });
        
    }
    catch(err){
        console.log("hii")
        console.log(err);
    }
    },[])
    return(
    <UserContext.Provider value={{user,setUser,ready,showToast,setShowToast,showRegisterToast,setShowRegisterToast}}>
        {children}
    </UserContext.Provider>
    )
}