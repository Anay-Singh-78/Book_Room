import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const AccountNav = () => {
    const {pathname} = useLocation()
    let subpage = pathname.split('/')?.[2];
    if(subpage === undefined)
        subpage = 'account'
    const returnClass = (type = null)=>{
      console.log(type,subpage)
        if(type === subpage)
          return "bg-primary rounded-full text-white "
        else
        return "bg-gray-300 rounded-full"
    }
  return (
    <div>
         <nav className='w-full flex flex-col md:flex-row gap-2 my-8 justify-center'>
         <Link to={"/account"} className={`${returnClass('account')}  px-6 py-2 font-mono inline-flex gap-1`}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path strokeLinecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
         My Profile</Link>
         <Link to={'/account/bookings'} className={`${returnClass('bookings')}  px-6 py-2 font-mono inline-flex gap-1`}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path strokeLinecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
         My Bookings</Link>
         <Link to ={'/account/places'} className={`${returnClass('places')}  px-6 py-2 font-mono inline-flex gap-1`}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path strokeLinecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
</svg>

         My Accomodation</Link>
         </nav>
    </div>
  )
}

export default AccountNav