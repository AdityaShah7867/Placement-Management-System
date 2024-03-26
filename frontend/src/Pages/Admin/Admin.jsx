import React, { useEffect, useState } from "react";
import AdminCard from "../../Components/Card/AdminCard";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [placements, setPlacements] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [date, setDate] = useState("");
  const [branch, setBranch] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("");
  const [criteria, setCriteria] = useState("");
  const [info, setInfo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem('user'));



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8010/api/placement/get-placements",
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setPlacements(data.placements);
        } else {
          console.error("Failed to fetch placements");
        }
      } catch (error) {
        console.error("Error fetching placements:", error);
      }
    };
    fetchData();
  }, [token]);

  

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8010/api/placement/create-placement",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include bearer token in the headers
          },
          body: JSON.stringify({
            companyName,
            jobTitle,
            Date: date,
            Branch: branch,
            salary,
            type,
            criteria,
            info,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        window.location.reload();
      } else {
        alert("Placement creation failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
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

                  <form onSubmit={handleSubmit}>
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
                        id="companyName"
                        name="companyName"
                        placeholder="Enter company name"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="date"
                        className="block text-lg font-semibold mb-2"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                        id="jobTitle"
                        name="jobTitle"
                        placeholder="Enter job title"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor='salary'
                        className="block text-lg font-semibold mb-2"
                      >
                        Salary
                      </label>
                      <input
                        type="text"
                        id="salary"
                        name="salary"
                        placeholder="Enter Salary"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="type"
                        className="block text-lg font-semibold mb-2"
                      >
                        Type
                      </label>
                      <input
                        type="text"
                        id="type"
                        name="type"
                        placeholder="Enter Type"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="criteria"
                        className="block text-lg font-semibold mb-2"
                      >
                        Criteria
                      </label>
                      <input
                        type="text"
                        id="criteria"
                        name="criteria"
                        placeholder="Enter criteria"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        value={criteria}
                        onChange={(e) => setCriteria(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="info"
                        className="block text-lg font-semibold mb-2"
                      >
                        Information
                      </label>
                      <input
                        type="text"
                        id="info"
                        name="info"
                        placeholder="Enter Information"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                      />
                    </div>

                    <select
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Branch
                      </option>
                      <option value="IT">IT</option>
                      <option value="COMPS">Computer</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                      <option value="EXTC">EXTC</option>
                      {/* Add more options as needed */}
                    </select>

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
        {placements.map((placement) => (
          <AdminCard key={placement._id} placement={placement} />
        ))}
      </div>
    </div>
  );
};

export default Admin;
