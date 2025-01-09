import React from 'react'
import Profile from '../Profile/Profile'
import RadialChart from '../RadialChart/RadialChart'

function Sidebar() {
  return (
    <div className="w-[20rem] mt-[3.9rem] h-[calc(100%-5rem)] fixed right-0 top-0 flex flex-col">
      <Profile />
      <div className='mx-5'>
        <RadialChart/>
      </div>
      <button className='mt-auto mb-6 mx-6 py-4 px-8 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-outt' >
        Sign Out 
      </button>
    </div>
  )
}

export default Sidebar
