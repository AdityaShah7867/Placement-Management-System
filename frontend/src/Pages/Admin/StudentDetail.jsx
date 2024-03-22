import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentDetail = () => {
  const { id } = useParams(); // Extract the 'id' parameter from the URL
  const [placement, setPlacement] = useState(null);
  const token = localStorage.getItem("token");


  useEffect(() => {
    // Fetch the placement details including applicants using the extracted ID
    const fetchPlacementDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8010/api/placement/get-applicants/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
            // Include your token here if required
          },
        });
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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="text-2xl font-normal mb-4">Student Details of</div>
      <div className="text-2xl ml-2 mb-4 font-bold">{placement?.companyName}</div>
      <div className="p-8 mt-10">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">SR no.</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              {placement?.applicants?.map((applicant, index) => (
                <tr key={applicant?._id} className="border-b border-blue-gray-200">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{applicant?.name}</td>
                  <td className="py-3 px-4">{applicant?.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
