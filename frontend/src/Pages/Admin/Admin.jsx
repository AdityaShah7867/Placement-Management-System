import React, { useState } from "react";
import AdminCard from "../../Components/Card/AdminCard";

const Admin = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-wrap justify-end items-end gap-8 mr-8 p-8">
        <div
          className="bg-green-500 text-xl text-white p-2 rounded-md cursor-pointer"
          onClick={openModal}
        >
          Create Placement
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="p-4">
                {/* Modal content */}

                <div>
                  <div class="flex justify-between items-center mb-4">
                    <div class="font-semibold text-xl">
                      SCHEDULE A PLACEMENT
                    </div>

                    <div
                      class="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
                      onClick={closeModal}
                    >
                      Close
                    </div>
                  </div>

                  <form action="#" method="POST">
                    <br />
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-lg font-semibold mb-2"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="date"
                        className="block text-lg font-semibold mb-2"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="job_title"
                        className="block text-lg font-semibold mb-2"
                      >
                        Job Title
                      </label>
                      <input
                        type="text"
                        id="job_title"
                        name="job_title"
                        placeholder="Enter your job title"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        Submit
                      </button>
                    </div>
                    <br />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center items-center gap-4">
        <AdminCard />
        <AdminCard />
        <AdminCard />
      </div>
    </div>
  );
};

export default Admin;
