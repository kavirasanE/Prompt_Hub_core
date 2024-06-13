import React, { useContext, useEffect, useState } from 'react'
import { Online } from '../components/Sidebar'
import DeviceAcordian from '../components/ConnectedDevices/DeviceAcordian'
import animation from '../assets/animation.json'
import Lottie from 'react-lottie'
import { DataContext } from '../components/context/DataProvider'
import Footer from '../components/Footer'
const ConnectedDevices = () => {
  const {listDevices,setListDevices} =useContext(DataContext)
  const [devices, setDevices] = useState([])
  const [data, setData] = useState([])
  // console.log(window.deviceConnect)

  const getBuildDetails = async (callback) => {
    await window.deviceConnect.device((datas, output) => {
      if (datas) {
        // console.log(datas)
      } else {
        const outputString = output
        let obj = outputString.split('\n')
        // console.log(obj)
        let deviceName = ''
        let buildNumber = ''
        let buildNo = ''
        obj.map((d, index) => {
          if (d.includes('ro.build.lab126.project')) {
            deviceName += d
            deviceName = deviceName.split('\n')
            // console.log(o[0])
          } else if (d.includes('ro.build.version.name')) {
            buildNumber += d
            buildNumber = buildNumber.split('\n')
          } else if (d.includes('build')) {
            buildNo += d
            buildNo = buildNo.split('\n')
          }
        })
        let next = obj[0].split(' ')
        // let devicename = obj[16].split(' ')
        let build = obj[29].split(' ')
        const buildDetails = {
          deviceName: deviceName[0],
          build: buildNumber[0],
          version: buildNo[1]
        }
        if (callback) callback(buildDetails)
      }
    })
  }

  // getBuildDetails();
  console.log(devices)
  const trackDevice = () => {
    window.deviceConnect.connectedDevice((data, output) => {
      if (data) {
        setListDevices((prevDevices) => {
          // if (data.status === 'plug') {
          // let know =data.id
          if (data.status === 'plug') {
              console.log(data, "from frontend")
            getBuildDetails((buildDetails) => {
              if (buildDetails) {
                const UpdatedData = { ...data, ...buildDetails }
                if (!prevDevices.some((device) => device.id === data.id)) {
                  setListDevices([...prevDevices, UpdatedData])
                }
              }
            })
          } else if (data.status === 'unplug') {
            return prevDevices.filter((device) => device.id !== data.id)
          }
          return prevDevices
        })
      } else {
        // console.log(output)
      }
    })
  }

  useEffect(() => {
    trackDevice()
  }, [])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div className="">
      <Online />
      <div className="p-5">
      
        <div>
        {listDevices.length <= 0 ? (  <p className="font-bold text-2xl ">No Devices Connected</p>) : (  <p className="font-bold text-2xl">Connected Devices :</p>)}
        
        </div>
        {listDevices.length <= 0 ? (
          <div className="flex flex-row  justify-center items-center p-10">
            <Lottie options={defaultOptions} height={400} width={500} />
          </div>
        ) : (
          <div>
            {listDevices.map((device, index) => (
              <div key={device.id} className="">
                <DeviceAcordian device={device} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='absolute bottom-0 w-full'>
        <Footer/>
      </div>
    </div>
  )
}

export default ConnectedDevices
