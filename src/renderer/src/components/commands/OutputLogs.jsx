import React, { useContext, useRef, useState } from 'react'
import { DataContext } from '../context/DataProvider'
import { MdOutlinePauseCircleOutline } from 'react-icons/md'
import { GrResume } from 'react-icons/gr'
import { MdContentCopy } from 'react-icons/md'
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'

const OutputLogs = ({ output }) => {
  const { commandstoOuput, setPauseRunningCommand, pauseRunningCommand } = useContext(DataContext)
  const textRef = useRef('')
  const [copytext, setCopyText] = useState(true)

  const CopytoClipboard = () => {
    let copyText = textRef.current?.innerText
    console.log(copyText)
    let isCopy = copy(copyText)
    if (isCopy) {
      toast.success('Copied Sucessfully')
    }
  }
  const handleCopy = () => {
    setCopyText(!copytext)
    if (copytext == true) {
      CopytoClipboard()
    }
  }

  return (
    <div className="text-white">
      <p className="bg-white/20 p-2  font-medium subpixel-antialiased flex justify-between items-center">
      
        <button
          onClick={() => setPauseRunningCommand(!pauseRunningCommand)}
          className="text-yellow-200  rounded-sm text-xl p-1 "
        >
          {/* {pauseRunningCommand ? <MdOutlinePauseCircleOutline /> : <GrResume />} */}
        </button>
        <button className="flex items-center gap-1 px-4 text-sm font-normal" onClick={handleCopy}>
         
          {copytext ? (
            <span className="flex items-center gap-1">
              <MdContentCopy /> Copy Command
            </span>
          ) : (
            '! Copied'
          )}
        </button>
      </p>
      <pre className="text-yellow-200 truncate p-2" >
        Command : {commandstoOuput}
      </pre>
      <pre className="p-5 break-all text-wrap" ref={textRef}>{output} </pre>
    </div>
  )
}

export default OutputLogs
