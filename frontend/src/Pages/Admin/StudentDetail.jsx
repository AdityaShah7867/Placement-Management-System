import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentDetail = () => {
  const { id } = useParams(); // Extract the 'id' parameter from the URL
  const [placement, setPlacement] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null); // Track the selected applicant for the modal
  const [showModal, setShowModal] = useState(false); // State variable to control modal visibility
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch the placement details including applicants using the extracted ID
    const fetchPlacementDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8010/api/placement/get-applicants/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              // Include your token here if required
            },
          }
        );
        const data = await response.json();
        if (data) {
          setPlacement(data);
        } else {
          console.error("Failed to fetch placement details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPlacementDetails();

    // Cleanup function to clear the state on unmount
    return () => {
      setPlacement(null);
    };
  }, [id]);

  if (!placement) {
    return <div>Loading...</div>; // Placeholder for when data is being fetched
  }
  const handleOpenModal = (applicant) => {
    setSelectedApplicant(applicant);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="text-2xl font-normal mb-4">Student Details of</div>
      <div className="text-2xl ml-2 mb-4 font-bold">
        {placement?.companyName}
      </div>
      <div className="p-8 mt-10">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">SR no.</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Branch</th>
                <th className="py-3 px-4 text-left">Year</th>
                <th className="py-3 px-4 text-left">Roll No</th>
                <th className="py-3 px-4 text-left">Resume</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              {placement?.applicants?.map((applicant, index) => (
                <tr
                  key={applicant?._id}
                  className="border-b border-blue-gray-200"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{applicant?.name}</td>
                  <td className="py-3 px-4">{applicant?.email}</td>
                  <td className="py-3 px-4">{applicant?.Branch}</td>
                  <td className="py-3 px-4">{applicant?.year}</td>
                  <td className="py-3 px-4">{applicant?.rollno}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleOpenModal(applicant)}
                      className="text-blue-600 hover:underline focus:outline-none"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedApplicant && showModal && (
        <div className="fixed z-10 w-full inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 min-h-10/12 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {selectedApplicant.name}'s Resume
                    </h3>
                    <div className="mt-2">
                      <iframe
                        src={`http://localhost:8010/uploads/${selectedApplicant?.resume}`}
                        className="w-full h-96"
                        title="Resume"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetail;
