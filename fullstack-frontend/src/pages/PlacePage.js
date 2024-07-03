import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingCode from '../BookingCode';
import PlacePicture from '../PlacePicture';
import AddressLink from '../AddressLink';

const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null)
    
    useEffect(() => {
        if (!id)
            return;
        axios.get('/places/' + id).then(response => {
            setPlace(response.data)
            console.log(response.data)
        })
    }, [])
    if (!place)
        return ''
    
    console.log(place)
    return (
        <div className='mt-4 bg-gray-100 -mx-8  px-8 pt-8'>
            <h1 className='text-3xl'>{place.title}</h1>
            <AddressLink>
                {place.address}
                </AddressLink>          
         <PlacePicture place={place}/>

            <div className='mt-8 grid gap-8 items-center grid-cols-1 md:grid-cols-[1fr_1fr]'>
                <div>
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn} <br />
                    Check-out: {place.checkOut} <br />
                    Max number of Guests : {place.maxGuests}
                   
                </div>
                <div>
                   <BookingCode place={place}/>
                </div>
            </div>
            <div className='bg-white -mx-8 px-8 py-8 mt-4'>
            <div>
            <h2 className='font-semibold text-2xl'>Extra Info</h2>
            </div>
            <div className='text-sm text-gray-700 leading-4 mb-4 mt-1'>{place.extraInfo}</div>
            </div>
         
        </div>
    )
}

export default PlacePage