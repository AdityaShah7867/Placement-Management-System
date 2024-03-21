import React from 'react'
import { useNavigate } from "react-router-dom"
import { BsCalendar2Date } from "react-icons/bs";
const AdminCard = () => {
    const navigate = useNavigate()
  return (
    <div className="bg-white max-w-72  shadow-lg min-w-80 p-4 rounded-md font-semibold text-base">
      <div className='font-bold text-2xl'>Company Name</div>
      <br/>
      <div className="font-normal text-xl font-serif">job role :</div>
      <div className="flex flex-wrap gap-4 mt-4 font-normal">
        <div className="mt-1 text-xl ">
          <BsCalendar2Date />
        </div>
        <div>Starts On : </div>
      </div>

     

      <div className="flex flex-row mt-6">
        <button onClick={() => {
          navigate(`/company`)
        }} className=" bg-blue-500 text-white p-2 text-base rounded-md hover:bg-blue-600">
          View Details
        </button>
        
      </div>

    </div>
  )
}

export default AdminCard