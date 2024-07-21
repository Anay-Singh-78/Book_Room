import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const ListOfPages = () => {
    const [places,setPlaces] = useState([])
    useEffect(()=>{
        axios.get('/user-places').then(({data})=>{
            setPlaces(data);
        })
    },[])
  return (
    <div>
        <div className='text-center '>
    <Link to={'/account/places/new'} className='bg-primary text-white py-2 px-4 rounded-full inline-flex gap-2 max'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

        Add new Places
    </Link>
    </div>
    <div className='mt-4 md:w-11/12 lg:w-2/3 md:mx-auto flex flex-col gap-4 rounded-2xl'>
        {places.length > 0 && places.map((place)=>(
                <Link to={'/account/places/'+place._id} className='flex cursor-pointer bg-gray-100 gap-4 px-2 py-3 rounded-2xl items-center'>
                    <div className='flex w-32 h-32 bg-gray-300 shrink-0 '>
                      {place.addedPhotos.length > 0 && (
                        <img className='w-full object-cover' src={"http://localhost:5000/uploads/"+place.addedPhotos[0]} alt="One of the room pic" />
                      )}  
                    </div>
                    <div>
                    <h2 className='text-xl bold font-mono'>{place.title}</h2>
                    <p className='text-sm mt-2'>{place.description}</p>
                    </div>
                </Link>
        )
        )}
    </div>
</div>
  )
}

export default ListOfPages