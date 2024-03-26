import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsCalendar2Date } from "react-icons/bs";

const PlacementCard = ({ placement, authToken }) => {
  const navigate = useNavigate();
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    // Check if the user ID exists in the applicants array
    if (placement.applicants.includes(userId)) {
      setApplied(true);
    } else {
      setApplied(false);
    }
  }, [placement.applicants]);

  const handleApply = async () => {
    try {
      const response = await fetch(
        `http://localhost:8010/api/placement/join-placement/${placement._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        window.location.reload();
      } else {
        alert("Failed to apply for the placement");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "An error occurred while applying for the placement. Please try again."
      );
    }
  };

  return (
    <div className="bg-white max-w-72 shadow-lg min-w-80 p-4 rounded-md font-semibold text-base">
      <div className="font-bold text-2xl">{placement.companyName}</div>
      <br />
      <div className="font-normal text-xl font-serif">
        Job Role: {placement.jobTitle}
      </div>
      {placement.info && (
  <div className="font-normal mt-2 text-xl font-serif">
    Job Desc: {placement.info}
  </div>
)}
      <div className="flex flex-wrap gap-4 mt-2 font-normal">
        <div className="mt-1 text-xl">
          <BsCalendar2Date />
        </div>
        <div>Starts On: {placement.Date}</div>
      </div>
      <div className="mt-2">
        <p>Banch: {placement.Branch}</p>
      </div>

      <div className="mt-2">
        <p>Salary: {placement.salary || 'not provided'}</p>
      </div>
      <div className="mt-2">
        <p>Criteria: {placement.criteria || 'not provided'}</p>
      </div>

      <div className="flex flex-row mt-6">
        {applied ? (
          <button
            className="bg-green-500 text-white p-2 text-base rounded-md"
            disabled
          >
            Already Applied
          </button>
        ) : (
          <button
            onClick={handleApply}
            className="bg-blue-500 text-white p-2 text-base rounded-md hover:bg-blue-600"
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default PlacementCard;
