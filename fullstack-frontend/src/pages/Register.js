// import axios
import { useContext, useState } from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from "react-router-dom"
import { UserContext } from "../UserContext"
export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const {setShowRegisterToast} = useContext(UserContext)
  const handleSubmit = async (e) => {
    try{
    e.preventDefault();
    const data = await axios.post('/register', {
      name, email, password
    });
    if (data.status === 200) {
      setShowRegisterToast(true)
        navigate('/login')
    }
    setName('')
    setEmail('')
    setPassword('')
    console.log(data);
  }
  catch(err){
    if(err.response && err.response.status === 403){
      toast("Email already exist! Try Logging in")
      console.log("Email already exist")
    }
    else{
      toast("Some error occured")
      console.log("Error Occured")
    }
  }
}
  return (
    <div className="mt-4 grow flex items-center justify-center">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form action="" className="max-w-md mx-auto">
          <input type="text" placeholder="Jhon Doe" value={name} onChange={e => setName(e.target.value)} />
          <input type="email" className="" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="primary" onClick={handleSubmit}>Register</button>
          <div className="text-center w-full mt-1">
            <span className="text-gray-400">Already a member ?</span>
            <Link to='/login' className=" text-slate-500 underline hover:text-slate-900">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}