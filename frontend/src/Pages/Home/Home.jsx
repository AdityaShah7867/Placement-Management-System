import React, { useState, useEffect } from "react";
import PlacementCard from "../../Components/Card/PlacementCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [placements, setPlacements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPlacements, setFilteredPlacements] = useState([]);
  const [branchFilter, setBranchFilter] = useState("All");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const response = await fetch(
          "http://localhost:8010/api/placement/get-placements",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setPlacements(data.placements);
          setFilteredPlacements(data.placements);
        } else {
          console.error("Failed to fetch placements");
        }
      } catch (error) {
        console.error("Error fetching placements:", error);
      }
    };

    fetchPlacements();
  }, [token]);

  useEffect(() => {
    if (user && user.isAdmin) {
      navigate("/admin");
    }
  }, [user, navigate]);

  useEffect(() => {
    const filtered = placements.filter((placement) => {
      if (branchFilter === "All") {
        return placement.companyName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      } else {
        return (
          placement.companyName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) &&
          placement.Branch === branchFilter
        );
      }
    });
    
    setFilteredPlacements(filtered);
  }, [searchTerm, branchFilter, placements]);

  const handleBranchFilterChange = (event) => {
    setBranchFilter(event.target.value);
  };

  return (
    <div className="m-4 p-4 min-h-screen bg-gray-50">
      <br />
      <h1 className="text-black text-3xl justify-center items-center flex font-semibold p-4 mb-8 ml-8">
        {" "}
        Ongoing Placement Drives !
      </h1>
      <div className="flex justify-between items-center mb-8">
        <input
          type="text"
          placeholder="Search by company name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="p-2 border w-full border-gray-300 rounded-md mr-4"
        />
        <select
          value={branchFilter}
          onChange={handleBranchFilterChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="All">All Branches</option>
          <option value="IT">IT</option>
          <option value="COMPS">Computer</option>
          <option value="Electronics">Electronics</option>
          <option value="Electrical">Electrical</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
          <option value="EXTC">EXTC</option>
          {/* Add more options if needed */}
        </select>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6">
        {filteredPlacements.map((placement) => (
          <PlacementCard
            key={placement._id}
            placement={placement}
            authToken={token}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
