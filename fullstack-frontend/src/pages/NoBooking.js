import React from 'react'
import { useNavigate } from 'react-router-dom'

function NoBooking() {
    const navigate = useNavigate()
  return (
    <div className='mx-auto my-auto flex flex-col'>
        <img src="https://cdn-icons-png.flaticon.com/128/200/200941.png" alt="" className='mb-2 ' />
        <p className='font-mono opacity-60'>You have no Bookings</p>
        <button className='primary' onClick={()=>navigate('/')}>Book Now</button>
    </div>
  )
}

export default NoBooking