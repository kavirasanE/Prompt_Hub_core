import React, { useContext, useRef } from 'react'
import { Accordion, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataProvider'
import { MdContentCopy } from 'react-icons/md'
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'
const DeviceAcordian = ({ device, index }) => {
  const { setCurrentDSN } = useContext(DataContext)
  let dsnRef = useRef(0)

  const CopyDSN = () => {
    let copydsn = dsnRef.current?.innerText
    let Copy = copy(copydsn)
    if (Copy) {
      toast.success(' DSN Copied')
    }
  }

  // console.log(device, 'output from accordian')
  return (
    <div className="p-5">
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title className="bg-gray-300 text-black hover:bg-gray-500 ">
            <div className=" w-15/16 flex flex-row items-center justify-between ">
              <p>{device.deviceName}</p>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            <div className="font-bold  px-5">
              <div className="flex flex-row justify-between items-center">
                <p>{device.build}</p>
                <p className='flex items-center justify-between gap-3'>
                  DSN:<span ref={dsnRef}>{device.DSN}  </span> <MdContentCopy onClick={CopyDSN} className='cursor-pointer' />
                </p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-10 p-5">
                  {/* <Link to="/logs"> */}
                  <a
                  style={{backgroundColor: "#ec7211"}}
                    href="https://prod.idms.gdq.amazon.dev/#/device-request"
                    target="_blank"
                    className=" text-black font-bold  rounded-lg p-2 px-4 "
                  >
                   Check-in
                  </a>
                  {/* </Link> */}

                  <Link to="/commands">
                    <Button color="dark" onClick={() => setCurrentDSN(device.DSN)}>
                      Check Commands
                    </Button>
                  </Link>
                </div>
                <p>{device.version}</p>
              </div>
            </div>
            {/* <p> {device.status}</p>
            <p>{device.type}</p> */}
            {/* {index} */}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  )
}

export default DeviceAcordian
