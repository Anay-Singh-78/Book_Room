import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import {loadStripe} from '@stripe/stripe-js'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'
function BookingCode({ place }) {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberoOfMaxGuests, setNumberOfMaxGuests] = useState(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect] = useState('')
    const { user, setShowToast } = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        setName(user?.name)
    }, [user])
    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }
    const bookThisPlace = async (e) => {
        e.preventDefault()
        try {
            if(checkIn === '' || checkOut === '' || phone === '')
               return toast.warning("Please fill all the required field")
            if(numberOfNights < 0)
                return toast.warning("Check Out date cannot be before the Check In date")
            if(phone.length < 10)
                return toast.warning('Phone Number is wrong')
            const data = {
                checkIn, checkOut, numberoOfMaxGuests, name, phone,
                place: place._id,
                price: numberOfNights * place.price
            }
            // console.log(numberoOfMaxGuests)
            console.log(place.maxGuests)
            
           if(numberoOfMaxGuests > place.maxGuests)
            return toast("Number of guest is more than the limit")
           
            // setBookingData(data)
            console.log("Hii")
            const sendData = [data]
            // const stripe = await loadStripe('pk_live_51PebFdFEZRyQV6i8hRq9TUJpy8Dpy7ubaBxacYIXdNlvysc3CwNqWGd8fZiot9dEEmT7dXk8IAiFAD1lbhMzGZUF00ME0H88pF') 
          
            const response = await axios.post('/make-payment', sendData)
            console.log(response)
            window.location.href = response.data.url
            // const result = await stripe.redirectToCheckout({
            //     sessionId: response.data.id // Corrected the parameter name
            // });
            // console.log("hiiiiiiiiiiiii")
    
            // if (result.error) {
            //     console.error(result.error.message);
            // }
            // const bookingId = response.data._id
            // setRedirect(`/account/bookings/${bookingId}`)
        }
        catch (err) {
            if (err.response && err.response) {
                // console.log('hii')
                setShowToast(true)
                navigate('/login')
            }
        }
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
         <div className='shadow p-4 rounded-2xl bg-white'>
            <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={true}
        theme="dark"
      />
            <div className='text-2xl text-center'>
                Price: {place.price}$ per night
            </div>
            <div className='border rounded-2xl mt-4'>
                <div className='grid md:grid-cols-2 sm:grid-cols-1'>
                    <div className='py-3 px-4 border-b md:border-r flex justify-between md:block'>
                        <label>Check in: <span className=' text-red-400'>*</span></label>
                        <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className='cursor-pointer' />
                    </div>
                    <div className='py-3 px-4 flex justify-between md:block '>
                        <label>Check out: <span className=' text-red-400'>*</span></label>
                        <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className='cursor-pointer' />
                    </div>
                </div>
                <div className='py-3 px-4 border-t'>
                    <label>Number of Guests <span className=' text-red-400'>*</span></label>
                    <input type="number"  value={numberoOfMaxGuests} onChange={e => setNumberOfMaxGuests(e.target.value)} />
                </div>

                        <div className='py-3 px-4 border-t'>
                            <label>Your Full Name <span className=' text-red-400'>*</span></label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} />
                            <label>Phone Number <span className=' text-red-400'>*</span></label>
                            <input type="tel" value={phone}  onChange={e => setPhone(e.target.value)} />
                        </div>
                  
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
        </div>
    )
}

export default BookingCode