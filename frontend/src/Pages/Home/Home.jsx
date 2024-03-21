import React from 'react'
import PlacementCard from '../../Components/Card/PlacementCard'

const Home = () => {
  return (
    <div className='m-4 p-4 min-h-screen bg-gray-50'>
        <br/>
        <h1 className='text-black text-2xl font-semibold p-4 mb-8 ml-8'> Ongoing Placement Drives !</h1>
        <div className='flex flex-wrap justify-center items-center gap-6'>
        <PlacementCard/>
        <PlacementCard/>
        <PlacementCard/>
        <PlacementCard/>
        </div>
    </div>
  )
}

export default Home