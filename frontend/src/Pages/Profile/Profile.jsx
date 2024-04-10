import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);

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
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <h2 className="pl-6 text-2xl font-bold sm:text-xl">Profile</h2>
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  {userData && (
                    <>
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
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
                          required
                        />
                      </div>
                      <div className="mb-2 sm:mb-6">
                        <label htmlFor="profession" className="block mb-2 text-sm font-medium text-indigo-900 ">
                          Roll no
                        </label>
                        <input
                          type="text"
                          id="profession"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Branch"
                          defaultValue={userData.rollno}
                          required
                        />
                      </div>
                      <h1 className="text-2xl mt-12">RESUME HERE: {userData.resume}</h1>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
