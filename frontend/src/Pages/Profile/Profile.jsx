import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  useEffect(() => {
    // Fetch user profile data from the API
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store token in localStorage
        const response = await axios.get('http://localhost:8010/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.user);
        setIsAdmin(response.data.user.isAdmin); // Set isAdmin state based on user data
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <div className="bg-white w-full flex justify-center items-center flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4">
            <div className='flex w-full'>
              <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                <h2 className="pl-6 text-2xl font-bold sm:text-3xl ">Profile</h2>
                <div className="grid max-w-2xl mx-auto ">
                  <div className="items-center mt-6 text-[#202142]">
                    {userData && (
                      <>
                        <div className="flex flex-wrap flex-col justify-center items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                          <div className="w-full">
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-indigo-900 ">
                              Your first name
                            </label>
                            <input
                              type="text"
                              id="first_name"
                              className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                              placeholder="Your first name"
                              defaultValue={userData.name}
                              disabled
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-2 sm:mb-6">
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900 ">
                            Your email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="your.email@mail.com"
                            defaultValue={userData.email}
                            required
                            disabled
                          />
                        </div>
                        <div className="mb-2 sm:mb-6">
                          <label htmlFor="profession" className="block mb-2 text-sm font-medium text-indigo-900 ">
                            Branch
                          </label>
                          <input
                            type="text"
                            id="profession"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Branch"
                            defaultValue={userData.Branch}
                            disabled
                            required
                          />
                        </div>
                        {/* Conditionally render roll number if user is not an admin */}
                        {!isAdmin && (
                          <div className="mb-2 sm:mb-6">
                            <label htmlFor="roll_no" className="block mb-2 text-sm font-medium text-indigo-900 ">
                              Roll no
                            </label>
                            <input
                              type="text"
                              id="roll_no"
                              className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                              placeholder="Roll no"
                              defaultValue={userData.rollno}
                              disabled
                              required
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* Conditionally render the iframe only if user is not admin */}
              {userData && !isAdmin && (
                <div className="mt-2">
                  <h1 className="text-2xl mt-12">RESUME HERE</h1>
                  <iframe
                    src={`http://localhost:8010/uploads/${userData?.resume}`}
                    className="h-96"
                    title="Resume"
                    style={{ width: '250%' }}
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
