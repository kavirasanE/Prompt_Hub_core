import React, { useContext } from 'react'
import { Table } from 'flowbite-react'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { decode } from 'messagepack'
import { DataContext } from '../context/DataProvider'

const CommandTable = ({ item, index, callback }) => {
  const { setCommandstoOutput, pauseRunningCommand, listDevices,commandsLoading,setCommandsLoading,currentDSN } = useContext(DataContext)
  // console.log(pauseRunningCommand)
  // console.log("handled roperly",currentDSN);
  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCommandsLoading(true)
    setTimeout(()=> {
      setCommandsLoading(false)
    },1500)
    setCommandstoOutput(item.command)
    const coms = item.command
    let device = currentDSN
    console.log(device)
    const shellComand = coms
    // console.log(shellComand)
    window.electron.ipcRenderer.invoke('shellCommand', shellComand, device).then((res) => {
      const socket = new WebSocket('ws://localhost:8080')
      socket.onopen = () => {
        console.log('Connected to WebSocket server')
      }
      socket.onmessage = (event) => {
        let last = JSON.parse(event.data)
        //  if(pauseRunningCommand == true){
          setTimeout(() => {
            callback(last)
          },1000)
        //  }
        //  else{
        //   alert("you have paused the log please resume it before clicking the command")
        //  }
      }
      socket.onclose = () => {
        console.log('Disconnected from WebSocket server')
      }

      socket.onerror = (error) => {
        console.error('WebSocket error:', error)
      }
    })
  }

  return (
    <Table hoverable className="border border-gray-500 cursor-pointer ">
      <Table.Body>
        <Table.Row className="bg-white hover:bg-gray-300 dark:border-gray-700 ">
          <Table.Cell
            className="font-medium break-all text-gray-900 dark:text-white"
            onClick={handleClick}
          >
            {item.command} <br />
            <span className="text-xs font-thin clear-start flex items-center gap-1">
              <IoInformationCircleOutline className="text-xs" /> {item.description}
            </span>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default CommandTable
