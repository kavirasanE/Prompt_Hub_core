import { Button, Drawer, Sidebar, TextInput } from 'flowbite-react'
import { useState } from 'react'
import {
  HiChartPie,
  HiClipboard,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiOutlineUserGroup,
  HiShoppingBag,
  HiUsers
} from 'react-icons/hi'
import { TbPrompt, TbBrandSpeedtest } from 'react-icons/tb'
import { HiCommandLine } from 'react-icons/hi2'
import { PiPlugsConnectedDuotone } from 'react-icons/pi'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import quip from '../assets/quip.png'

export function Online() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <>
      <div className="flex items-center justify-between w-full p-1 px-10 border">
        <RxHamburgerMenu
          size={40}
          className="rounded-lg border border-gray-100 p-1.5 shadow-lg shadow-black/50 text-black cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
        <p className="rounded-md font-bold text-xl  p-2 text-white bg-black">
          Prompt <span  className="bg-gray-300 p-0.5 rounded-sm px-2 text-black ">hub</span>
          {/* style={{backgroundColor: "#ec7211"}}     */}
        </p>
        <a
          href="https://quip-amazon.com/3CxOAyamZbJl/Untitled#temp:C:eET1d0643d10858404087b11218a"
          target="_blank"
        >
          <img src={quip} className="w-20 h-10 object-contain cursor-pointer" />
        </a>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Prompt Hub" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-center ">
              <form className="pb-3 md:hidden ">
                <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
              </form>
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Link to="/logs">
                    <Sidebar.Item icon={TbPrompt}>Take Logs</Sidebar.Item>
                  </Link>
                  <Link to="/Home">
                    <Sidebar.Item icon={TbBrandSpeedtest} label="Beta">
                      Test your Commands
                    </Sidebar.Item>
                  </Link>
                  {/* <Sidebar.Item href="/demo">Test</Sidebar.Item> */}
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                  <Link to="/connectdevice" className="">
                    <Sidebar.Item icon={PiPlugsConnectedDuotone}>Connected Devices</Sidebar.Item>
                  </Link>
                  <Link to="/commands" className=" ">
                    <Sidebar.Item icon={HiCommandLine}>Log Commands</Sidebar.Item>
                  </Link>
                  <Link to="/contibutors">
                    <Sidebar.Item icon={HiOutlineUserGroup}>About Prompt Hub</Sidebar.Item>
                  </Link>
                  <Link to="/thoughts">
                    <Sidebar.Item icon={HiInformationCircle}>Share your Thoughts</Sidebar.Item>
                  </Link>
                  <Sidebar.ItemGroup>
                    <Link to="/idmstracker">
                      <Sidebar.Item href="#" label="Pro" labelColor="dark">
                        IDMS Tracker
                      </Sidebar.Item>
                    </Link>
                    <Link to="/bugreportai">
                      <Sidebar.Item href="#" label="AI" labelColor="dark">
                        Bug Report AI
                      </Sidebar.Item>
                    </Link>
                    <Link to="/missinglabel">
                      <Sidebar.Item href="#" label="Beta" labelColor="dark">
                        Missing Label
                      </Sidebar.Item>
                    </Link>
                    <Link to="/urlhub">
                      <Sidebar.Item href="#" label="Beta" labelColor="dark">
                        URL Hub
                      </Sidebar.Item>
                    </Link>
                  </Sidebar.ItemGroup>
                </Sidebar.ItemGroup>
                <p className="text-sm text-center font-thin mt-10">Prompt Hub &#169; V 10.00.0</p>
              </Sidebar.Items>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  )
}
