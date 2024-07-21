
import { useNavigate } from 'react-router-dom'
const Success = () => {
    const navigate = useNavigate()
  return (
    <div className='my-auto mx-auto flex flex-col'>
        <img src="https://cdn-icons-png.flaticon.com/128/5299/5299035.png" alt="" className='bg-teal-900 rounded-full translate-x-16 mb-4 p-4 size-28' />
        <p className='font-mono font-bold '>Your Payment is Successfull</p>
        <button className='primary' onClick={()=>navigate('/')}>Move to Home Page</button>
    </div>
  )
}

export default Success