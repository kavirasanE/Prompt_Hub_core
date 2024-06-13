// import React, { useEffect, useState } from 'react'
// import { Online } from '../components/Sidebar'
// import { Button, Label } from 'flowbite-react'
// import { HiInformationCircle } from "react-icons/hi";
// import { Alert } from "flowbite-react";

// const Takelogs = () => {
//   const [folder, setFolder] = useState('')
//   const [display, setDisplay] = useState("")
//   const [alert,setAlert] =useState(false)

//   // window.socket.device((err, output) => {
//   //   if (err) {
//   //     console.log(err)
//   //   } else {
//   //     setDisplay(output)
//   //     // console.log(display)
//   //   }
//   // })

//   const handleChange = (e) => {
//    e.preventDefault();
//     const fileName = e.target.files[0].name
//     const res = e.target.files[0].path
//     const lastIndex = res.lastIndexOf('\\')
//     if (lastIndex !== -1) {
//       setFolder(res.substring(0, lastIndex + 1))
//       console.log(res.substring(0, lastIndex + 1))
//     } else {
//       console.log(res)
//     }
//   }
//   const handleLogs = () => {
//     // let logcatCommand ="logcat -v threadtime"
//     let location = folder
//     window.electron.ipcRenderer
//       .invoke('runninglog', location)
//       .then((res) => {
//         const socket = new WebSocket('ws://localhost:3000')
//         socket.onopen = () => {
//           console.log("connected to Take logs")
//         }
//         socket.onmessage = ( event) => {
//           let logs = JSON.parse(event.data)
//           setDisplay(logs)
//         }
//         console.log(res);
//         socket.onerror = () => {
//           console.log( "take logs Error")
//         }
//       })
//       .catch((err) => {
//         console.log(err)
//       })
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
//         <input
//           type="file"
//           webkitdirectory="true"
//           dir="true"
//           title="Choose a Folder"
//           onChange={handleChange}
//           className="border border-black rounded-r-md  rounded-l-xl"
//         />
//         {folder && (
//           <p className="text-black/80 font-bold p-2 px-4  border-r-2 border-b-2 rounded shadow-lg border-black/50 m-2 ">
//             {folder}
//           </p>
//         )}
//       </div>
//       {alert &&
//        <div className='mx-20 p-4'>
//         <Alert color="warning" icon={HiInformationCircle}>
//           <span className="font-medium">Working Directory is not set! </span> Please set Working directory before taking logs.
//         </Alert>
//       </div>}
//       <Button className="m-5" onClick={handleLogs}>
//         Take Logs
//       </Button>
//       <div className="border border-gray-300 bg-black/90 mx-10 mt-10 h-96 overflow-y-auto p-2 rounded-xl">
//         <pre className="text-white">{display}</pre>
//       </div>

//     </div>
//   )
// }

// export default Takelogs

import React, { useEffect, useState } from 'react'
import { Online } from '../components/Sidebar'
import { Button, Label } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi'
import { Alert } from 'flowbite-react'

const Takelogs = () => {
  const [folder, setFolder] = useState('')
  const [display, setDisplay] = useState('')
  const [alert, setAlert] = useState(false)

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   // setFolder("")
  //   if (e.target.files.length > 0) {
  //     console.log(e.target.files)
  //     const res = e.target.files[0].path
  //     const lastIndex = res.lastIndexOf('\\')
  //     if (lastIndex !== -1) {
  //       setFolder(res.substring(0, lastIndex + 1))
  //       console.log(res.substring(0, lastIndex + 1))
  //     } else {
  //       console.log(res)
  //     }
  //   }
  //   // setAlert(false)
  // }
  const handleChange = (e) => {
    const fileName = e.target.files[0].name
    const res = e.target.files[0].path
    const lastIndex = res.lastIndexOf('\\')

    if (lastIndex !== -1) {
      setFolder(res.substring(0, lastIndex + 1))
      console.log(res.substring(0, lastIndex + 1))
    } else {
      console.log(res)
    }
  }

  const handleLogs = () => {
    if (folder == '') {
      setAlert(true)
      return;
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
          let logs = JSON.parse(event.data)
          setAlert(false)
          setDisplay(logs)
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
    window.electron.ipcRenderer
    .invoke('getpath')
    .then((res) => {
      const path = res[0];
      const  folder = path.split("\\");
      let splic = folder.slice(0,folder.length)
      // console.log(splic)
      // console.log(splic.join("\\"))
      let finalPath =splic.join("\\") + "\\"
      setFolder(finalPath);
     
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
          <Button onClick={handlePath} outline gradientDuoTone="greenToBlue" className='w-64'>Set working Directory</Button>
        {/* <input
          type="file"
          title="Choose a Folder"
          onChange={handleChange}
          className="border border-black rounded-r-md  rounded-l-xl"
        ></input> */}
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
      <div className="border border-gray-300 bg-black/90 mx-10 mt-10 h-96 overflow-y-auto p-2 rounded-xl">
        <pre className="text-white">{display}</pre>
      </div>
    </div>
  )
}

export default Takelogs
