import React from 'react'
import PlacementCard from '../../Components/Card/PlacementCard'

const Home = () => {
  return (
    <div className='m-4 p-4 min-h-screen bg-gray-50'>
        <br/>
        <h1 className='text-black text-2xl font-semibold mb-8'> Ongoing Placement Drives !</h1>
        <PlacementCard/>
    </div>
  )
}

export default Home