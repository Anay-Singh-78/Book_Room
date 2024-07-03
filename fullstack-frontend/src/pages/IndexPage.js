import React, { useEffect, useState } from "react"
import axios from "axios"
import {Link} from 'react-router-dom'
export default function IndexPage(){
    const [places,setPlaces] = useState('')
    useEffect(()=>{
        axios.get('/places').then(response=>{
            setPlaces(response.data)
            console.log(response)
        })
    },[])
    // console.log(places)
    return(
       <div className=" mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 rounded-2xl lg:grid-cols-4">
        {places.length > 0 && places.map(place=>(
            <Link to={'/place/'+place._id}>
                <div className="bg-gray-500 rounded-2xl flex mb-2 aspect-sqaure h-72">
                    {place.addedPhotos?.[0] &&(
                        <img src={"http://localhost:5000/uploads/" + place.addedPhotos[0]} alt="" className="rounded-2xl object-cover"/>
                    )}
                </div>
                <h3 className="font-bold ">{place.address}</h3>
                <h2 className="text-sm text-gray-500">{place.title}</h2>
                <div className="mt-2 leading-4">
                    <span className="font-bold">${place.price} per night</span>
                </div>
            </Link> 
        ))}
       </div>
    )
}