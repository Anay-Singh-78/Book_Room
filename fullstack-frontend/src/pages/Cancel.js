import React from 'react'
import { useNavigate } from 'react-router-dom'

function Cancel() {
    const navigate = useNavigate()
  return (
    <div className='my-auto mx-auto flex flex-col'>
    <img src="https://cdn-icons-png.flaticon.com/128/9426/9426995.png" alt="" className='translate-x-8 mb-2 size-24' />
    <p className='font-mono font-bold '>Your Payment failed!</p>
    <button className='primary' onClick={()=>navigate('/')}>Move to Home Page</button>
</div>
  )
}

export default Cancel