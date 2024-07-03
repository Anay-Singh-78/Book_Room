import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddressLink from '../AddressLink'
import PlacePicture from '../PlacePicture'
import BookingDateDetails from './BookingDateDetail'

function BookingPage() {
    const { id } = useParams()
    const [booking, setBookings] = useState(null)
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id)
                if (foundBooking)
                    setBookings(foundBooking)
            })
        }
    })
    if (!booking)
        return '';
    return (
        <div className='my-8 md:w-2/3 md:mx-auto'>
            <h1 className='text-3xl'>{booking.place.title}</h1>
            <AddressLink>{booking.place.address}</AddressLink>
            <div className='bg-gray-200 p-6 my-4 rounded-2xl flex justify-between items-center'>
               <div>
               <h2 className='text-2xl mb-4'>Your Booking Information</h2>
               <BookingDateDetails booking={booking} />
               </div>
               <div className='bg-primary p-6 text-white rounded-2xl'>
                <div>Total Price</div>
                <div className='text-3xl'>${booking.price}</div>
               </div>
            </div>
            <PlacePicture place={booking.place} />
        </div>
    )
}

export default BookingPage