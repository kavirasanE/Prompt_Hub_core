import React from 'react'
import { Online } from '../components/Sidebar'
import Commingsoon from '../components/Commingsoon'
const BugReportai = () => {
  return (
    <div>
      <Online />
      <p className='p-2 text-xl font-bold text-gray-900 '>BUG REPORT AI</p>
      <div className=" flex flex-col justify-center items-center ">
        <Commingsoon />
        <p className='text-center p-20 font-bold text-lg'>
          🚀 Buckle up! The updates are in the development phase and will soon be in production for
          your convenience and assistance. ✨ Good day to you!
        </p>
      </div>
    </div>
  )
}

export default BugReportai