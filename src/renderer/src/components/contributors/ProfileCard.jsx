import React from 'react'
import amazon from "../../assets/amazon.png"
const ProfileCard = ({data}) => {
    // console.log(data)
  return (
    <div className='m-5' >
       <div className={`w-36 h-72 border-4  bg-black rounded-xl p-3 ${data.years >= 5 ? "border-orange-400 shadow-lg shadow-orange-500" :"border-blue-500 shadow-lg shadow-blue-600" }`} >
      
             <p className={`w-20 h-5 border-4 ${data.years >= 5 ?  "border-orange-400" :"border-blue-700"}  bg-white mx-4 rounded-xl`}></p>
             <p className='text-white text-center font-normal p-1 h-10 '>{data.name}</p>
             <img src={data.photo} className='object-contain  pt-4'/>
             <p className='text-white text-center font-light p-1'>@{data.username}</p>
       </div> 
    </div>
  )
}

export default ProfileCard