import React from 'react'

const Footer = () => {
  let currentDate = new Date()
  let currentYear = currentDate.getFullYear()
  return (
    <div className=' bottom-1'>
      <p className=" border border-t-0 mx-10 border-black"></p>
      <p className="flex justify-center items-center text-sm p-2">
        <a href="https://phonetool.amazon.com/users/kavirasa"  target='_blank'  className='cursor-pointer underline'>
          Designed and Developed by KAVIRASAN E (Device Associate) {currentYear}. &reg;All
        Right Reserved
        </a>

      </p>
    </div>
  )
}

export default Footer
