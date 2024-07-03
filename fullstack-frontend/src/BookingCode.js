import React, { useContext, useEffect, useState } from 'react'
import {differenceInCalendarDays} from 'date-fns'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'
function BookingCode({place}) {
    const [checkIn,setCheckIn]  = useState('')
    const [checkOut,setCheckOut] = useState('')
    const [numberoOfMaxGuests,setNumberOfMaxGuests] = useState(1)
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [redirect,setRedirect] = useState('')
    const {user,setShowToast} = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(()=>{
        setName(user?.name)
    },[user])
    let numberOfNights = 0;
    if(checkIn &&checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut) , new Date(checkIn))
    }
    const bookThisPlace = async(e)=>{
        e.preventDefault()
     try{
        const data = {checkIn,checkOut,numberoOfMaxGuests,name,phone,
            place:place._id,
            price:numberOfNights*place.price
    }
    const response = await axios.post('/booking',data)
    const bookingId = response.data._id
    setRedirect(`/account/bookings/${bookingId}`)
     }
     catch(err){
        if(err.response && err.response){
            console.log('hii')
            setShowToast(true)
            navigate('/login')
        }
     }
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }
  return (
    <div> <div className='shadow p-4 rounded-2xl bg-white'>
    <div className='text-2xl text-center'>
        Price: {place.price}$ per night
    </div>
    <div className='border rounded-2xl mt-4'>
        <div className='grid grid-cols-2'>
            <div className='py-3 px-4'>
                <label>Check in: </label>
                <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)}/>
            </div>
            <div className='py-3 px-4 border-l'>
                <label>Check out: </label>
                <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} />
            </div>
        </div>
        <div className='py-3 px-4 border-t'>
            <label>Number of Guests</label>
            <input type="number" value={numberoOfMaxGuests} onChange={e=>setNumberOfMaxGuests(e.target.value)} />
        </div>
        {
            numberOfNights >0 && (
                <div className='py-3 px-4 border-t'>
            <label>Your Full Name</label>
            <input type="text" value={name} onChange={e=>setName(e.target.value)} />
            <label>Phone Number</label>
            <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} />
        </div>
            )
        }
    </div>

    <button onClick={bookThisPlace} className='primary mt-4'>
        Book this place: 
        {
            numberOfNights > 0 && (
                <span>${
                    numberOfNights * place.price
                    }</span>
            )
        }
        </button>
</div></div>
  )
}

export default BookingCode