// import React, { useEffect, useState } from 'react'
// import { Online } from '../components/Sidebar'
// import { Button, Label } from 'flowbite-react'
// import { HiInformationCircle } from 'react-icons/hi'
// import { Alert } from 'flowbite-react'

// const Takelogs = () => {
//   const [logs, setLogs] = useState({})
//   const [folder, setFolder] = useState('')
//   const [display, setDisplay] = useState([])
//   const [alert, setAlert] = useState(false)

//   const addLogEntry = ({ deviceId, result }) => {
//     console.log(deviceId)
//     console.log(result)
//   }

//   const handleLogs = () => {
//     if (folder == '') {
//       setAlert(true)
//       return
//     }
//     let location = folder
//     window.electron.ipcRenderer
//       .invoke('runninglog', location)
//       .then((res) => {
//         const socket = new WebSocket('ws://localhost:3000')
//         socket.onopen = () => {
//           console.log('connected to Take logs')
//         }
//         socket.onmessage = (event) => {
//           let Logs = JSON.parse(event.data)
//           let deviceId = Logs.deviceId
//           let result = Logs.result
//           setLogs((prevLogs) => {
//             const updatedLogs = { ...prevLogs }
//             if (updatedLogs[deviceId]) {
//               updatedLogs[deviceId].push(result)
//             } else {
//               updatedLogs[deviceId] = [result]
//             }
//             return updatedLogs
//           })
//           setDisplay((prevLogs) => [...prevLogs, Logs])
//           setAlert(false)
//         }
//         socket.onerror = () => {
//           console.log('take logs Error')
//         }
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

//   const handlePath = () => {
//     window.electron.ipcRenderer.invoke('getpath').then((res) => {
//       const path = res[0]
//       const folder = path.split('\\')
//       let splic = folder.slice(0, folder.length)
//       let finalPath = splic.join('\\') + '\\'
//       console.log(finalPath)
//       setFolder(finalPath)
//     })
//   }

//   return (
//     <div>
//       <div className="flex justify-between">
//         <Online />
//       </div>
//       <div className="px-24 pt-5 flex flex-col">
//         <Label
//           htmlFor="large-folder-upload"
//           value="Select a Folder"
//           className="font-semibold text-lg"
//         />
//         <Button onClick={handlePath} outline gradientDuoTone="greenToBlue" className="w-64">
//           Set working Directory
//         </Button>
//         {folder.length > 0 && (
//           <p className="text-black/80 font-bold p-2 px-4 border-r-2 border-b-2 rounded shadow-lg border-black/50 m-2">
//             {folder}
//           </p>
//         )}
//       </div>
//       {alert && (
//         <div className="mx-20 p-4">
//           <Alert color="warning" icon={HiInformationCircle}>
//             <span className="font-medium">Working Directory is not set! </span> Please set Working
//             directory before taking logs.
//           </Alert>
//         </div>
//       )}
//       <Button className="m-5" onClick={handleLogs}>
//         Take Logs
//       </Button>
//       <div className="border border-gray-300 bg-black/90 mx-10 mt-10 h-96 overflow-y-auto p-2 rounded-xl">
//         {Object.keys(logs).map((deviceId) => (
//           <>
//             <h2>Device ID:{deviceId}</h2>
//             <pre>
//               {logs[deviceId].map((result) => (
//                 <pre className='text-white break-all'>{result}</pre>
//               ))}
//             </pre>
//           </>
//         ))}

//       </div>
//     </div>
//   )
// }

// export default Takelogs

import React, { useEffect, useRef, useState } from 'react'
import { Online } from '../components/Sidebar'
import { Button, Label } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi'
import { Alert } from 'flowbite-react'

const Takelogs = () => {
  const [logs, setLogs] = useState({})
  const [folder, setFolder] = useState('')
  const [display, setDisplay] = useState([])
  const [alert, setAlert] = useState(false)
  const LogRef = useRef(null)

  useEffect(() => {
    if (LogRef.current) {
      LogRef.current.scrollTop = LogRef.current.scrollHeight
    }
  }, [logs])

  const handleLogs = () => {
    if (folder === '') {
      setAlert(true)
      return
    }
    let location = folder
    window.electron.ipcRenderer
      .invoke('runninglog', location)
      .then((res) => {
        const socket = new WebSocket('ws://localhost:3000')
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

          setAlert(false)
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
      <Button className="m-5" onClick={handleLogs}>
        Take Logs
      </Button>

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
