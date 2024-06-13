import React from 'react'
import { Accordion, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
const DeviceAcordian = ({ device, index }) => {
  console.log(device, 'output from accordian')
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
                  DSN: <span>{device.id} </span>
                </p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-10 p-5">
                  <Link to="/logs">
                    <Button color="dark">Take Logs</Button>
                  </Link>

                  <Link to="/commands">
                    <Button color="dark">Check Commands</Button>
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
