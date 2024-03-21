import React from 'react'
import AdminCard from '../../Components/Card/AdminCard'


const Admin = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
        <div className='flex flex-wrap justify-end items-end gap-8 mr-8 p-8'>
            <div className='bg-green-500 text-xl text-white p-2 rounded-md'>
                    Create Placement
            </div>
        </div>

        <div className='flex flex-wrap justify-center items-center gap-4'>
            <AdminCard />
            <AdminCard/>
            <AdminCard/>
        </div>

    </div>
  )
}

export default Admin