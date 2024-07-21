import React, { useEffect, useState } from "react"
import axios from "axios"
import {Link} from 'react-router-dom'
import ServerDown from "./ServerDown"
export default function IndexPage(){
    const [places,setPlaces] = useState('')
    const [server,setServer] = useState(false)
    useEffect(()=>{
        axios.get('/places').then(response=>{
            setPlaces(response.data)
            setServer(false)
            // console.log(response)
        }).catch(err=>{
            setPlaces('')
            setServer(true)
        })
    },[])
    if(server)
        return <ServerDown/>
    // console.log(places)
    return(
       <div className=" mt-8 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 rounded-2xl lg:grid-cols-4 md:w-11/12 lg:w-5/6 md:mx-auto ">
        {places.length > 0 && places.map(place=>(
            <Link to={'/place/'+place._id}>
                <div className=" rounded-2xl flex mb-2 aspect-sqaure h-48 ">
                    {place.addedPhotos?.[0] &&(
                        <img src={"http://localhost:5000/uploads/" + place.addedPhotos[0]} alt="" className="rounded-2xl w-full object-cover"/>
                    )}
                </div>
                <h3 className="font-bold ">{place.address}</h3>
                <h2 className="text-sm text-gray-500 truncate">{place.title}</h2>
                <div className="mt-2 leading-4">
                    <span className="font-bold">${place.price} per night</span>
                </div>
            </Link> 
        ))}
       </div>
    )
}