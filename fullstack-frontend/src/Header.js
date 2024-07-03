import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext"
export default function Header() {
  const { user } = useContext(UserContext)
  return (
    <div>
      <header className="flex justify-between">
        <a href="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 -rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          <span className="font-bold text-xl">Airbnb</span>
        </a>
        <div className="flex border border-gray-300 rounded-full shadow-md shadow-gray-300 py-2 px-4 gap-2 ">
          <div>Any where</div>
          <div className="border-l-2 border-gray-400"></div>
          <div>Any week</div>
          <div className="border-l-2 border-gray-400"></div>
          <div>Any guests</div>
          <button className=" bg-primary text-white p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
        <div className="flex border border-gray-300 rounded-full  py-2 px-4 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
        
            <Link to={user ?'/account':'/login'} className="flex gap-2">
            <div className="bg-gray-500 rounded-full text-white border border-gray-500 overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 relative top-1">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
              </div>
                {
                  !!user && (
                    <div>
                      {/* {console.log(user.name.split(" "))} */}
                      {(user.name.split(' '))[0]}
                    </div>
                  )
                }
            </Link>
          
        </div>
      </header>
    </div>
  )
}