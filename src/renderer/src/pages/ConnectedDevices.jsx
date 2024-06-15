import React, { useContext, useEffect, useState } from 'react'
import { Online } from '../components/Sidebar'
import DeviceAcordian from '../components/ConnectedDevices/DeviceAcordian'
import animation from '../assets/animation.json'
import Lottie from 'react-lottie'
import { DataContext } from '../components/context/DataProvider'
import Footer from '../components/Footer'
import { IoRefreshCircle } from 'react-icons/io5'
import { MdInfoOutline } from 'react-icons/md'
import { Tooltip } from 'flowbite-react'

const ConnectedDevices = () => {
  const { listDevices, setListDevices } = useContext(DataContext)
  const [devices, setDevices] = useState([])
  const [data, setData] = useState([])

  const getBuildDetails = async (callback) => {
    await window.deviceConnect.device((datas, output) => {
      if (datas) {
        console.log(typeof datas)
      } else {
        try {
          console.log(output, 'output from frontend')
          const outputString = output
          let obj = outputString.split('\n')
          let deviceName = ''
          let buildNumber = ''
          let buildNo = ''
          obj.map((d, index) => {
            if (d.includes('ro.build.lab126.project')) {
              deviceName += d
              deviceName = deviceName.split('\n')
              deviceName = deviceName[0]
              // console.log(o[0])
            } else if (d.includes('ro.build.version.name')) {
              buildNumber += d
              buildNumber = buildNumber.split('\n')
              buildNumber = buildNumber[0]
            } else if (d.includes('build')) {
              buildNo += d
              buildNo = buildNo.split('\n')
              buildNo = buildNo[1]
            } else if (d.includes('OE_VERSION')) {
              deviceName += 'Hypnos/Galileo'
            } else if (d.includes('BUILD_DESC')) {
              buildNumber += d
            } else if (d.includes('BUILD_VARIANT')) {
              buildNo += d
            }
          })
          const buildDetails = {
            deviceName: deviceName,
            build: buildNumber,
            version: buildNo
          }
          if (callback) callback(buildDetails)
        } catch (err) {
          console.log(output)
          const vega = getVegaDetails(output)
          if (vega) {
            if (callback) callback(vega)
          }
          console.log(err, 'error from the frontend vega device ')
        }
      }
    })
  }

  // const getVegaDetails = (output) => {
  //   console.log(output, 'from get Vega Details')
  //   let convertTostring = output.split('\n')
  //   let deviceName = 'Hypnos/Galileo'
  //   let buildNumber = ''
  //   let buildNo = ''
  //   convertTostring.map((data, index) => {
  //     if (data.includes('BUILD_DESC')) {
  //       buildNumber += data
  //       console.log(buildNumber, 'build details')
  //     } else if (data.includes('BUILD_VARIANT')) {
  //       buildNo += data
  //       console.log(buildNo, 'vega detail')
  //     }
  //   })
  //   const buildDetails = {
  //     deviceName: deviceName,
  //     build: buildNumber,
  //     version: buildNo
  //   }
  //   console.log(buildDetails)
  //   return buildDetails
  // }

  const trackDevice = () => {
    window.deviceConnect.connectedDevice((data, output) => {
      if (data) {
        setListDevices((prevDevices) => {
          // if (data.status === 'plug') {
          // let know =data.id
          if (data.status === 'plug') {
            console.log(data, 'from frontend')
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

  const handleRefresh = () => {
    trackDevice()
  }

  return (
    <div className="">
      <Online />
      <div className="p-5">
        <div className="px-20 flex justify-end items-center gap-5 ">
          <Tooltip content="Refresh" placement="bottom">
            <IoRefreshCircle
              className="w-10 h-10 cursor-pointer text-blue-900  active:scale-75 transform duration-400 ease-in-out"
              onClick={handleRefresh}
            />
          </Tooltip>
          <Tooltip
            content="Make sure the device is online. If the device is offline or not showing, please click the refresh button."
            placement="bottom"
          >
            <MdInfoOutline className="w-10 h-10 cursor-pointer text-blue-900  hover:scale-90 transform duration-400" />
          </Tooltip>
        </div>
        <div>
          {listDevices.length <= 0 ? (
            <p className="font-bold text-2xl ">No Devices Connected</p>
          ) : (
            <p className="font-bold text-2xl">Connected Devices :</p>
          )}
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
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  )
}

export default ConnectedDevices
