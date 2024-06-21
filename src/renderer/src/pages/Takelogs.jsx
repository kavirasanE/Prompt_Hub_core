import React, { useEffect, useRef, useState } from 'react'
import { Online } from '../components/Sidebar'
import { Button, Label, Alert } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi'

const Takelogs = () => {
  const [logs, setLogs] = useState({})
  const [folder, setFolder] = useState('')
  const [display, setDisplay] = useState([])
  const [alert, setAlert] = useState(false)
  const LogRef = useRef(null)
  const [socketConnection, setSocketConnection] = useState(false)

  useEffect(() => {
    if (LogRef.current) {
      LogRef.current.scrollTop = LogRef.current.scrollHeight
    }
  }, [logs])

  const handleLogs = async () => {
    if (folder === '') {
      setAlert(true)
      return
    }
    let location = folder
    await window.electron.ipcRenderer
      .invoke('runninglog', location)
      .then((res) => {
        const socket = new WebSocket('ws://localhost:3000')
        if (!socketConnection) {
          socket.onopen = () => {
            console.log('connected to Take logs')
          }
          socket.onmessage = (event) => {
            let Logs = JSON.parse(event.data)
            let deviceId = Logs.deviceId
            let result = Logs.result
            setLogs((prevLogs) => {
              const updatedLogs = { ...prevLogs }
              if (updatedLogs[deviceId]) {
                updatedLogs[deviceId].push(result)
              } else {
                updatedLogs[deviceId] = [result]
              }
              return updatedLogs
            })
            setDisplay((prevLogs) => [...prevLogs, Logs])
          }

          setAlert(false)
        } else {
          socket.onclose = () => {
            console.log('colsed the connection')
          }
        }
        socket.onerror = () => {
          console.log('take logs Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handlePath = () => {
    window.electron.ipcRenderer.invoke('getpath').then((res) => {
      const path = res[0]
      const folder = path.split('\\')
      let splic = folder.slice(0, folder.length)
      let finalPath = splic.join('\\') + '\\'
      console.log(finalPath)
      setFolder(finalPath)
    })
  }

  return (
    <div>
      <div className="flex justify-between">
        <Online />
      </div>
      <div className="px-24 pt-5 flex flex-col">
        <Label
          htmlFor="large-folder-upload"
          value="Select a Folder"
          className="font-semibold text-lg"
        />
        <Button onClick={handlePath} outline gradientDuoTone="greenToBlue" className="w-64">
          Set working Directory
        </Button>
        {folder.length > 0 && (
          <p className="text-black/80 font-bold p-2 px-4 border-r-2 border-b-2 rounded shadow-lg border-black/50 m-2">
            {folder}
          </p>
        )}
      </div>
      {alert && (
        <div className="mx-20 p-4">
          <Alert color="warning" icon={HiInformationCircle}>
            <span className="font-medium">Working Directory is not set! </span> Please set Working
            directory before taking logs.
          </Alert>
        </div>
      )}
      <div className="flex  justify-between items-center px-24">
        <Button className="m-5" onClick={handleLogs}>
          Take Logs
        </Button>
        {}
        <Button.Group>
          <Button className='bg-gray-500' pill onClick={() => setSocketConnection(false)}>
            Pause
          </Button>
          <Button className='bg-red-400' pill onClick={() => setSocketConnection(true)}>
            Resume
          </Button>
        </Button.Group>
      </div>
      {Object.keys(logs).map((deviceId) => (
        <>
          <div key={deviceId}>
            <p className="text-black font-bold text-xl underline px-10">Device ID: {deviceId}</p>
          </div>
          <div
            className="border border-gray-300 bg-black/90 scroll-auto overflow-y-auto mx-10 my-5 h-80 rounded-xl"
            ref={LogRef}
          >
            {logs[deviceId].map((result, index) => (
              <pre key={index} className="text-white text-wrap break-all ">
                {result}
              </pre>
            ))}
          </div>
        </>
      ))}
    </div>
  )
}

export default Takelogs
