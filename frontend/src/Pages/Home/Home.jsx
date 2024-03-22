import React, { useState, useEffect } from 'react';
import PlacementCard from '../../Components/Card/PlacementCard';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [placements, setPlacements] = useState([]);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();



  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        
        const response = await fetch('http://localhost:8010/api/placement/get-placemnt-branch', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setPlacements(data.placement);
        } else {
          console.error('Failed to fetch placements');
        }
      } catch (error) {
        console.error('Error fetching placements:', error);
      }
    };

    fetchPlacements();
  }, []);

  useEffect(() => {
    if (user && user.isAdmin) {
      navigate('/admin');
    }
  }, [user, navigate])

  return (
    <div className='m-4 p-4 min-h-screen bg-gray-50'>
      <br />
      <h1 className='text-black text-2xl font-semibold p-4 mb-8 ml-8'> Ongoing Placement Drives !</h1>
      <div className='flex flex-wrap justify-center items-center gap-6'>
        {placements.map(placement => (
          <PlacementCard key={placement._id} placement={placement} authToken={token} />
        ))}
      </div>
    </div>
  );
};

export default Home;
