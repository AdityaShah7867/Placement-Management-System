import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
       <section className="w-full px-8 text-gray-700 z-50 bg-white">
          <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl z-50">
            <div className="relative flex flex-col md:flex-row">
              
              <NavLink
                to="/"
                className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
              >
                <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">
                  AI<span className="text-indigo-600">.</span>
                </span>
              </NavLink>

              <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
                <NavLink
                  to="/"
                  className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                >
                  Home
                </NavLink>

                <NavLink
                  to="/docs"
                  className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                >
                  Docs
                </NavLink>
                
              </nav>
            </div>
            <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            <NavLink
                  to="/login"
                className="text-base font-medium leading-6 z-50 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900"
              >
                Sign in
              </NavLink>
              <NavLink
                to="/register"
                className="inline-flex z-50 items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                Sign up
              </NavLink>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Navbar