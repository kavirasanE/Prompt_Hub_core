import React, { useState } from 'react'
// import Versions from './Versions'
import '../assets/main.css'
import electronLogo from '../assets/electron.svg'

import './open.css'
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'
const Open = () => {
  const [data, setData] = useState()
  const ipcHandle = () => {
    window.electron.ipcRenderer.send('ping')
    // console.log(window.electron.ipcRenderer)
  }
  const handleAdb = () => {
    window.electron.ipcRenderer.invoke('adb', 'requestData').then((res) => {
      console.log('Response Data:', res)
      setData(res)
    })
  }
  return (
    <div className="background">
      <img alt="logo" className='w-40 h-40 rounded-3xl  blur-xs  drop-shadow-xl ' src={electronLogo} />
      <div className="text">
        Welcome to <span className="react ">PromptHUB</span>
      </div>
      <div className="button">
        <Link to="/connectdevice" className="text-xl font-medium px-24 subpixel-antialiased ">
          <Button className="bg-blue-900 hover:bg-blue-900 px-20 text-white  ">
            <span className='font-semibold text-xl'>Get Started  </span>
          </Button>
        </Link>
      </div>
      {/* <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div> */}
      {/* <button onClick={handleAdb} className="p-4 bg-white text-black">
          adb
        </button>
        {data ? <p> Data is {data}</p> : <p>No data</p>} */}

      {/* <Versions></Versions> */}
    </div>
  )
}

export default Open
