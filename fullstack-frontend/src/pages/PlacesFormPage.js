import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Perks from '../Perks'
import { useState } from 'react';
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';
const PlacesFormPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLink, setPhotoLink] = useState('')
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [price,setPrice] = useState(100)
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        if (!id)
            return
        axios.get('/places/' + id).then(response => {
            const { data } = response
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.addedPhotos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
        })
    }, [id])
    async function addPhotobByLink(e) {
        e.preventDefault();
        if (photoLink.length === 0) {
            toast("Please add an image link")
            return
        }
        const ind = photoLink.search('.')
        if (ind === -1) {
            toast("Please add a valid image link")
            return;
        }
        // const extenFind = photoLink.split('.')
        // const exten = extenFind[extenFind.length - 1]
        // if (exten !== 'jpg' && exten !== 'png' && exten !== 'webp' && exten !== 'jpeg') {
        //     toast("Invalid Image Type")
        //     return;
        // }
        console.log(photoLink)
        const { data: fileName } = await axios.post('/upload-by-link', { link: photoLink })
        console.log("Checking the value");
        setAddedPhotos(prev => {
            return [...prev, fileName]
        })
        setPhotoLink('')
    }
    const uploadPhoto = async (e) => {
        const files = e.target.files;
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i])
        }
        // console.log(data);
        const response = await axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        // console.log(response)
        const { data: fileNames } = response;
        // console.log(fileNames);
        setAddedPhotos(prev => {
            return [...prev, ...fileNames]
        })
    }
    const saveThePlace = async (e) => {
        e.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests,price
        }
        if (id) {
            await axios.put('/places', { id, ...placeData })
        }
        else {
            await axios.post('/places', placeData)
        }
        //  navigate('/account/places')
        setTitle('')
        setAddress('')
        setAddedPhotos([])
        setPhotoLink('')
        setDescription('')
        setExtraInfo('')
        setCheckIn('')
        setCheckOut('')
        setMaxGuests(1)
        setPerks([])
        setRedirect(true);
        // {
        //     action === 'new' && (
        //       <PlacesPage/>
        //     )
        // }
    }
    const handleDeleteImage = (e, link) => {
        e.preventDefault()
        setAddedPhotos(addedPhotos.filter(image => image !== link))
    }
    const handleStarMark = (e,link)=>{
        e.preventDefault();
        setAddedPhotos([link,...addedPhotos.filter(photo=>photo!==link)])
    }
    if (redirect) {
        return <Navigate to={'/account/places'} />
    }
    return (
        <div>
            <AccountNav />
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"

            />
            <form action="" onSubmit={saveThePlace}>
                {/* Title */}
                <h2 className='text-2xl mt-4'>Title</h2>
                <p className='text-gray-500 text-sm'> Title for your place.</p>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Title ,for instance My Lovely apartment' />
                {/* Address */}
                <h2 className='text-2xl mt-4'>Address </h2>
                <p className='text-gray-500 text-sm'>Address to this place</p>
                <input value={address} onChange={e => setAddress(e.target.value)} type="text" placeholder='Address' />
                {/* Photos */}
                <h2 className='text-2xl mt-4'> Photos</h2>
                <p className='text-gray-500 text-sm'>more = better</p>
                <div className='flex gap-2'>
                    <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder='Add Using a link.....jpg,png' />
                    <button className='bg-gray-200 px-4 rounded-2xl' onClick={addPhotobByLink}>Add&nbsp;Photo</button>
                </div>
                {/*Added photos view */}
                <div className='mt-2 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6'>
                    {addedPhotos.length > 0 && addedPhotos.map((photo) => (
                        <div className='h-32 flex relative' key={photo}>
                            <img src={'http://localhost:5000/uploads/' + photo} alt="Room pic" className='rounded-2xl w-full object-cover' />
                            <div className='absolute top-1 right-1 bg-gray-200 rounded-2xl p-1 opacity-50'>
                                <button onClick={(e) => handleDeleteImage(e, photo)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                </button>
                            </div>
                            <div>
                                <button className='absolute top-1 left-1 bg-gray-200 rounded-2xl p-1 opacity-50'onClick={(e)=>handleStarMark(e,photo)} >
                                    {
                                        photo === addedPhotos[0] && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                                            </svg>

                                        )
                                    }
                                    {
                                        photo !== addedPhotos[0] && (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* upload photos by link part */}
                    <label className='border bg-transparent rounded-2xl p-8 text-gray-600 flex w-full h-full justify-center items-center gap-1 cursor-pointer'>
                        <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        <p className='text-xl'>Upload</p>
                    </label>
                </div>
                {/* Description part */}
                <h2 className='text-xl mt-4'> Description</h2>
                <p className='text-gray-500 text-sm'>Description of the place</p>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
                {/* Perks Part */}
                <Perks selected={perks} onChange={setPerks} />
                {/* EXTRA INFO PART */}
                <h2 className='text-xl mt-4'>Extra Info </h2>
                <p className='text-gray-500 text-sm'>House rules, etc</p>
                <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
                {/* TIME PART */}
                <h2 className='text-xl mt-4'>Checkin & out times, max guests </h2>
                <p className='text-gray-500 text-sm'>Add Check in and out times ,remember to have some time window for cleaning the room between guests.</p>
                <div className='grid sm:grid-cols-4 gap-2 '>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check in time</h3>
                        <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder='12:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check out time</h3>
                        <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder='14:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Max Guests</h3>
                        <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
                    </div>  
                    <div>
                        <h3 className='mt-2 -mb-1'>Price per Night</h3>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                    
                </div>
                <button onClick={saveThePlace} className='primary'>Submit</button>
            </form>
        </div>
    )
}

export default PlacesFormPage