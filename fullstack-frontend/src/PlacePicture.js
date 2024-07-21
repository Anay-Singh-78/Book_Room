import React, { useState } from 'react'

function PlacePicture({place}) {    
    const [showAllPhotos, setShowAllPhotos] = useState(false)
    if (showAllPhotos) {
        return (
            <div className='absolute inset-0 bg-black text-white min-h-screen'>
                <div className=' bg-black opacity'>
                   <div className=' p-8 grid gap-4 md:w-11/12 lg:w-2/3 md:mx-auto '>
                   <div>
                        <h2 className='text-2xl font-mono mr-48 lg:mr-32'>Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className='fixed right-8 top-8 shadow shadow-black flex gap-1 px-4 py-2 rounded-2xl bg-white text-black'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>

                            Close Photos
                        </button>
                    </div>
                    {place?.addedPhotos?.length > 0 && place.addedPhotos.map(photo => (
                        <div className='w-full' key={photo}>
                            <img src={"http://localhost:5000/uploads/" + photo} alt="" className='w-full' />
                        </div>
                    ))}
                   </div>
                </div>

            </div>
        )
    }
  return (
    <div>
           <div className='relative'>
                <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'>
                    <div>
                        {place.addedPhotos?.[0] && (
                            <img onClick={()=>setShowAllPhotos(true)} className='h-full object-cover cursor-pointer' src={"http://localhost:5000/uploads/" + place.addedPhotos[0]} alt="" />
                        )}
                    </div>
                    <div className='grid'>
                        {place.addedPhotos?.[1] && (
                            <img onClick={()=>setShowAllPhotos(true)} src={"http://localhost:5000/uploads/" + place.addedPhotos[1]} alt="" className='h-full object-cover cursor-pointer' />
                        )}
                        {place.addedPhotos?.[2] && (
                            <div className='overflow-hidden'>
                                <img onClick={()=>setShowAllPhotos(true)} src={"http://localhost:5000/uploads/" + place.addedPhotos[2]} alt="" className='h-full object-cover relative top-2 cursor-pointer' />
                            </div>
                        )}
                    </div>
                </div>
                <button className='absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-black flex gap-1' onClick={() => setShowAllPhotos(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>

                    Show More Images
                </button>
            </div>
    </div>
  )
}

export default PlacePicture