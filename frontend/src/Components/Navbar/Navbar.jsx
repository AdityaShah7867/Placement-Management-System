import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/Images/Logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const user = JSON.parse(localStorage.getItem('user'));
      setIsAdmin(user.isAdmin);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/login');
    window.location.reload();
  };

  const downloadCSV = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8010/api/placement/csv-download', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'placements.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  return (
    <div>
      <section className="w-full px-8 text-gray-700 z-50 bg-white">
        <div className="container flex flex-col flex-wrap items-center justify-between mx-auto md:flex-row max-w-7xl z-50">
          <div className="relative flex flex-col md:flex-row">
            <NavLink
              to="/"
              className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
            >
              <img src={Logo} alt="" className='w-16 h-16'/>
            </NavLink>
            {isLoggedIn && (
              <>
                <NavLink
                  to="/home"
                  className="text-base font-medium leading-6 text-white bg-blue-500 mt-4  m-1 rounded-lg ml-12 mb-2 p-2"
                >
                  Home
                </NavLink>
              </>
            )}
          </div>
          <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            {isLoggedIn ? (
              <div>            
                <div className='flex justify-between gap-8'>
                  <div className='mt-3'>
                    <NavLink
                      to="/profile"
                      className="text-base font-medium leading-6 text-white bg-blue-500 mt-4 p-3 m-1 rounded-lg"
                    >
                      PROFILE
                    </NavLink>
                  </div>
                  {isAdmin && (
                    <button
                      className="text-base font-medium leading-6 text-white bg-blue-500 p-1  mr-5 rounded-lg whitespace-no-wrap transition duration-150 ease-in-out hover:text-red-900"
                      onClick={downloadCSV} 
                    >
                      Download CSV
                    </button>
                  )}
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
                <NavLink
                  to="/adminreg"
                  className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  Admin Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
