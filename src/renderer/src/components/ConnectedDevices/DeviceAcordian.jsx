import React, { useContext, useRef } from 'react'
import { Accordion, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataProvider'
import { MdContentCopy } from 'react-icons/md'
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'
const DeviceAcordian = ({ device, index }) => {
  const {setCurrentDSN} =useContext(DataContext);
  let dsnRef = useRef(0);

  const CopyDSN = () => {
    let copydsn = dsnRef.current?.innerText
    let Copy =copy(copydsn)
    if(Copy){
      toast.success(' DSN Copied')
    }
  }

  // console.log(device, 'output from accordian')
  return (
    <div className="p-5">
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title className="bg-blue-800 text-white hover:bg-blue-800 ">
            <div className=" w-15/16 flex flex-row items-center justify-between ">
              <p>{device.deviceName}</p>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            <div className="font-bold  px-5">
              <div className="flex flex-row justify-between items-center">
                <p>{device.build}</p>
                <p>
                  DSN: <span ref={dsnRef}>{device.DSN} </span> <MdContentCopy onClick={CopyDSN}/>
                </p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-10 p-5">
                  {/* <Link to="/logs"> */}
                  <a href='https://prod.idms.gdq.amazon.dev/#/device-checkin' target='_blank'>
                    <Button className=' bg-idms text-black/95 font-bold  rounded-full'>Check-in</Button>
                  </a>
                  {/* </Link> */}

                  <Link to="/commands">
                    <Button color="dark" onClick={() => setCurrentDSN(device.DSN)}>Check Commands</Button>
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
