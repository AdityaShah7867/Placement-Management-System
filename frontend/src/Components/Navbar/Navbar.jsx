import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/Images/Logo.png";
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
    window.location.reload();
  };


  
  return (
    <div>
       <section className="w-full px-8 text-gray-700 z-50 bg-white">
          <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl z-50">
            <div className="relative flex flex-col md:flex-row">
              
              <NavLink
                to="/"
                className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
              >
               <img src={Logo} alt="" className='w-16 h-16'/>
              </NavLink>

              

             
            </div>
            <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">

           


            {isLoggedIn ? (
              <div className='flex justify-between gap-8'>
              <div className='mt-3'>
               <NavLink
               to="/profile"
               className="text-base font-medium leading-6 text-white bg-blue-500 mt-4 p-2 m-1 rounded-lg "
             >
              PROFILE
             </NavLink>
             </div>
              <div>
              <button
                className="text-base font-medium leading-6 text-white bg-red-500 p-2 m-1 rounded-lg whitespace-no-wrap transition duration-150 ease-in-out hover:text-red-900"
                onClick={handleLogout}
              >
                Logout
              </button>
              </div>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Sign in
                </NavLink>
                <NavLink
                  to="/register"
                  className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  Sign up
                </NavLink>
              </>
            )}
            </div>
          </div>
        </section>
    </div>
  )
}

export default Navbar