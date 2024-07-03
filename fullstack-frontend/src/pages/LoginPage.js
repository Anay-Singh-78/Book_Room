import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { UserContext } from "../UserContext"
export default function LoginPage(){
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const navigate = useNavigate();
  const {setUser,showToast,setShowToast} = useContext(UserContext)
 
  useEffect(()=>{
    if(showToast){
      toast("Please Login First")
      setShowToast(false)
    }
  },[showToast])
  const handleLoginSubmit = async(e)=>{
    
    try{ 
    e.preventDefault();
    const response = await axios.post('/login',{email,password})
    // console.log(response.data);
    if(response.status === 200){
      setUser(response.data.user)
      // console.log("Login successfull")
      navigate('/')
    }
    }
    catch(err){
      if(err.response && err.response.status === 404){
        toast("Invalid Email id! Please Try again")
      }
      else if(err.response && err.response.status === 401)
        toast("Wrong Password! Please try again later")
      else if(err.response && err.response.status === 500)
        toast("Internal Server Error")
      else
      toast("Something happened")
    }
  }
    return(
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
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <form action="" className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
            <input type="email" className="" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <button className="primary">Login</button>
            <div className="text-center w-full mt-1">
            <span className="text-gray-400">Don't Have an Account ?</span>
            <Link to='/register' className=" text-slate-500 underline hover:text-slate-900">Register Now</Link>
            </div>
          </form>
          </div>
        </div>
    )
}