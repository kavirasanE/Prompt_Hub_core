import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Online } from './Sidebar'
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'
import Footer from './Footer'
import Marquee from 'react-fast-marquee'

export default function Home() {
  const [command, setCommand] = useState('')
  const [data, setData] = useState('no data displayed')
  const textRef = useRef('')

  const handleSend = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const serializableCommand = JSON.stringify({ command })
    window.electron.ipcRenderer
      .invoke('command', serializableCommand)
      .then((res) => {
        const parsedResponse = JSON.parse(res)
        console.log(parsedResponse)
        setData(parsedResponse)
        // setData(res)
      })
      .catch((err) => {
        setData(err)
        console.log(err)
      })
  }

  const CopytoClipboard = () => {
    let copyText = textRef.current?.innerText
    console.log(copyText);
    let isCopy = copy(copyText)
    if (isCopy) {
      toast.success('Copied to Clipboard')
    }
    console.log(copyText)
  }

  return (
    <div className="pt- bg-white">
      <div className="flex justify-between items-center">
        <Online />
        <Link to="/" className=" border-2 w-36 p-2 break-all rounded-lg text-white bg-black/80">
          Back to Home
        </Link>
      </div>

      <div className='bg-yellow-100'>
      <Marquee>
        <p className='my-5 p-1 rounded-lg font-bold text-lg  '>"This page is experimental, and we are working on it. It will be in production soon! Have a good day!".</p>
      </Marquee>
      </div>
      <div className="px-24 pt-5">
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label value="Test your commands here" />
            </div>
            <TextInput
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="getprop | grepbuild"
              required
            />
          </div>
          <Button type="submit" onClick={handleSend}>
            Submit
          </Button>
        </form>
      </div>

      <div className=" border-gray-300 bg-black/90 mx-10 mt-10 h-96 overflow-y-auto p-2 rounded-xl">
        <Button onClick={CopytoClipboard}>Copy to ClipBoard</Button>
        <pre ref={textRef} className='text-white'></pre>
       
      </div>
      <Footer/>
    </div>
  )
}
