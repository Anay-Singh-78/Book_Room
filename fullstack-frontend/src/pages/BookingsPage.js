import React, { useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from 'react-router-dom';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            console.log(response)
            setBookings(response.data)
        })
    }, [])
    return (
        <div>
            <AccountNav />
            <div>
                {bookings.length > 0 && bookings.map(booking => (
                    <Link to={'/account/bookings/'+booking._id} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden '>
                        <div className='w-48'>
                            {booking.place.addedPhotos.length > 0 && (
                                <img className='h-full object-cover' src={"http://localhost:5000/uploads/" + booking.place.addedPhotos[0]} alt="One of the room pic" />
                            )}
                        </div>
                        <div className='py-3 grow pr-3'>
                            <h2 className='text-xl'>{booking.place.title}</h2>
                            <div className='border-t flex gap-2 border-gray-300 mt-2 py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>

                                {format(new Date(booking.checkIn), 'dd-MM-yyyy')} &rarr;
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>

                                {format(new Date(booking.checkOut), 'dd-MM-yyyy')}
                            </div>
                            <div className='text-lg'>
                                Number of nights : {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} <br />
                                Total Price: ${booking.price}
                            </div>
                        </div>

                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BookingsPage