import React from 'react'

function ProfilePage({user,logOut}) {
    console.log(user)
  return (
        <div className='mt-10 flex flex-col w-full items-center gap-4 '>
              <div>
              Logged in as <span className=' font-bold'> {user.name}</span> ({user.email})</div>
              <button className='primary max-w-sm' onClick={logOut}>LogOut</button>
            </div>
  )
}

export default ProfilePage