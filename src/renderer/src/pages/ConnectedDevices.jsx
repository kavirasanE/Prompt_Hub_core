import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Online } from '../components/Sidebar'
import DeviceAcordian from '../components/ConnectedDevices/DeviceAcordian'
import animation from '../assets/animation.json'
import Lottie from 'react-lottie'
import { DataContext } from '../components/context/DataProvider'
import Footer from '../components/Footer'
import { IoRefreshCircle } from 'react-icons/io5'
import { MdInfoOutline } from 'react-icons/md'
import { Tooltip } from 'flowbite-react'
import rocketLoading from '../assets/rocket.gif'

const ConnectedDevices = () => {
  const { listDevices, setListDevices } = useContext(DataContext)
  const [loading, setLoading] = useState(true)

  const getBuildDetails = async () => {
    await window.deviceConnect.device((datas, output) => {
      if (datas) {
        try {
          let DSN = datas
          const outputString = output
          let obj = outputString.split('\n')
          let deviceName = ' '
          let buildNumber = ''
          let buildNo = ''
          //     deviceName =obj[16]

          // console.log(obj)
          // console.log(obj[30],"build details")
          obj.forEach((d) => {
            if (d.includes('ro.build.lab126.project')) {
              deviceName += d
              deviceName = deviceName.split('\n')
              deviceName = deviceName[0]
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
            DSN: DSN,
            deviceName: deviceName,
            build: buildNumber,
            version: buildNo
          }
          console.log(buildDetails)
          // setTimeout(() => {
          setListDevices((prevListDevices) => {
            let uniqueDevices = prevListDevices.filter((device) => device.DSN !== DSN)

            return [...uniqueDevices, buildDetails]
          })
          // }, 1000)
        } catch (err) {
          console.log(err)
        }
      }
    })
  }

  useEffect(() => {
    getBuildDetails()
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
    setLoading(false)
    setListDevices([])
    getBuildDetails()
    setLoading(true)
  }

  return (
    <div className="">
      <Online />
      {!loading ? (
        <img src={rocketLoading} className="w-full h-screen" />
      ) : (
        <div className="p-5 ">
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
                <div key={index} className="">
                  <DeviceAcordian device={device} index={index} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className=" ">
        <Footer />
      </div>
    </div>
  )
}

export default React.memo(ConnectedDevices)

// const trackDevice =  () => {
//   window.deviceConnect.connectedDevice(async (data, output) => {
//     console.log(data,"await")
//     if (data) {
//       if (data.status === 'plug') {
//         try {
//           const buildDetails = await getBuildDetails();
//           // console.log(buildDetails)
//           if (buildDetails) {
//             const UpdatedData = { ...data, ...buildDetails};
//             await delay(200);
//             console.log(UpdatedData)
//             setListDevices((prevDevices) => {
//               const deviceExists = prevDevices.some((device) => device.id === data.id);
//               if (deviceExists) {
//                return prevDevices.map((device) => (device.id === data.id ? UpdatedData : device))
//               }
//                else {
//                 return [...prevDevices, UpdatedData]
//               }
//             })
//           }
//         } catch (err) {
//           console.log('error occured')
//         }
//       } else if (data.status === 'unplug') {
//         setListDevices((prevDevices) =>
//           prevDevices.filter((device) => device.id !== data.id))

//       }
//     } else {
//       console.log('no device Found')
//     }
//   });
// }
