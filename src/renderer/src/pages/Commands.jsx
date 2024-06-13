import React, { useEffect, useState, useRef, useContext } from 'react'
import { Online } from '../components/Sidebar'
import { Tabs, Table } from 'flowbite-react'
import CommandTable from '../components/commands/CommandTable'
import OutputLogs from '../components/commands/OutputLogs'
import Footer from '../components/Footer'
import { DataContext } from '../components/context/DataProvider'
import Lottie from 'react-lottie'
import loading from "../assets/loading.json"
const Commands = () => {
  
  const data = [
    {
      id: 0,
      title: 'GeneralCommands',
      commands: [
        {
          command: 'dumpsys activity service WhadService',
          description: 'Dumpsys command for CSM/FTV devices to know ASD, ASD score, TSS.'
        },
        {
          command: 'lipc-probe -v com.doppler.whad command',
          description: 'Dumpsys command for Puffin devices to know ASD, ASD score, TSS.'
        },
        {
          command: 'adb shell setprop persist.amazon.whad.tsm_score 255',
          description: 'Forcing specific device to be TSS (Time Sync Server).'
        },
        {
          command: 'logcat | grep -i "updateState"',
          description:
            'To check update flow (This will show update status from Downloading to successful).'
        },
        {
          command:
            'am startservice -a com.amazon.device.software.ota.service.CHECK_FOR_UPDATES -n com.amazon.device.software.ota/.OtaService',
          description: 'To check and force app OTA download to your device.'
        },
        {
          command:
            'am startservice -a com.amazon.device.software.ota.service.START_OBTRUSIVE -n com.amazon.device.software.ota/.OtaService',
          description: 'Command to start installation.'
        },
        {
          command: 'logcat -v threadtime | grep -i "DashMediaSource"',
          description: 'To check DRM wide_Entitlement.'
        },
        {
          command: 'logcat -v threadtime | grep -I DRM_GroupLicense_LicenseFetchAttempts',
          description: 'To check DRM group license/widevine_entitlement.'
        },
        {
          command: 'logcat -v threadtime | grep -i HttpAudioFetcher:sendAbrAttributes',
          description:
            'To check Katana loglines from AMU music (e.g., where music is playing in 3D, R360, HD, UHD Content).'
        },
        {
          command:
            "logcat | grep -ioE 'groupkeyid=[^,]+|drm=[^&]+|DRM_GroupLicense_LoadKeys[^,]+|DRM_GroupLicense_LicenseFetchAttempts|removeAllSessions:session cached|protectionScheme=[^,]+|createSession:Creating a new session'",
          description: 'Used to check all DRM related loglines.'
        },
        {
          command: 'logcat -v threadtime | grep -i "processGaplessMuxEndOfStream"',
          description: 'To check GaplessMuxEndOfStream loglines.'
        },
        {
          command: 'logcat -v threadtime | grep -i processGaplessMuxNewTrackSameStream',
          description: 'To check Gapless Mux Start Of the Stream loglines.'
        },
        {
          command: "logcat -v threadtime | grep -i 'DemuxedFrameSourceImp'",
          description: 'To check Offset loglines command.'
        },
        {
          command: 'setprop persist.amazon.whad.ismaster 1',
          description: 'Forcing the specific Device to be ASD, only for CSM devices.'
        },
        {
          command: 'lipc-set-prop -i com.doppler.whad distributionMasterScoreOverride 500',
          description: 'Forcing the specific Device to be ASD, only for Puffin devices.'
        },
        {
          command: 'logcat | grep volume',
          description: 'To check Volume level on the devices.'
        },
        {
          command: 'logcat -v threadtime | grep -i "disContinuityFound"',
          description: 'To check discontinuity logs for Tune in station.'
        },
        {
          command: 'adb logcat -v threadtime | grep -i skew',
          description: 'To check the BT skew values.'
        },
        {
          command: 'getprop | grep build',
          description: 'To check Device build details.'
        },
        {
          command: 'logcat |grep -i "using DemuxedDataSource"',
          description: 'To check demux (Tunein HLS).'
        }
      ]
    },
    {
      id: 1,
      title: 'FTVCommands',
      commands: [
        {
          command: 'exampleFTVCommand',
          description: 'This is an example command for FTV operations.'
        }
      ]
    },
    {
      id: 2,
      title: 'Spotify Commands',
      commands: [
        {
          command: 'dumpsys package com.amazon.spotify.mediabrowserservice | grep version',
          description: 'To check Spotify SMBS apk details'
        }
      ]
    },
    {
      id: 3,
      title: 'Tuple Devices Commands',
      commands: [
        {
          command: 'exampleTupleDeviceCommand',
          description: 'This is an example command for Tuple device operations.'
        }
      ]
    },
    {
      id: 4,
      title: 'Hypnos Galileo Commands',
      commands: [
        {
          command: 'exampleHypnosGalileoCommand',
          description: 'This is an example command for Hypnos and Galileo operations.'
        }
      ]
    },
    {
      id: 5,
      title: 'Hypnos Galileo Commands',
      commands: [
        {
          command: 'exampleHypnosGalileoCommand',
          description: 'This is an example command for Hypnos and Galileo operations.'
        }
      ]
    },
    {
      id: 6,
      title: 'LowPowerMode',
      commands: [
        {
          command: 'exampleLowPowerModeCommand',
          description: 'This is an example command for Low Power Mode operations.'
        }
      ]
    },
    {
      id: 7,
      title: 'MP_SM_Commands',
      commands: [
        {
          command: 'exampleMP_SM_Command',
          description: 'This is an example command for MP/SMC operations.'
        }
      ]
    },
    {
      id: 8,
      title: 'Longevity',
      commands: [
        {
          command: 'exampleLongevityCommand',
          description: 'This is an example command for Longevity operations.'
        }
      ]
    }
  ]
  

  const { commandsLoading, setCommandsLoading } = useContext(DataContext)
  const tabsRef = useRef(null)
  const [activeTab, setActiveTab] = useState(0)

  const [section, setSection] = useState(data)
  const [activeSection, setActiveSection] = useState('GeneralCommands')
  const [filteredCommands, setfilterCommands] = useState([])
  const [output, setOutput] = useState([])
  const logRef = useRef(0)
  const filterCommands = (id) => {
    const filter = data.filter((item) => item.id == id)
    setfilterCommands(filter[0].commands)
  }
  // console.log(filteredCommands)

  useEffect(() => {
    // console.log('act', activeTab)
    filterCommands(activeTab)
  }, [activeTab])

  // console.log(callback);

  const handleOutput = (output) => {
    setOutput(output)
    // console.log(output)
  }
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [output])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }


  return (
    <div className="max-h-screen h-full relative">
      {commandsLoading && 
      <div className=' bg-white/20 h-full w-full absolute z-10 flex justify-center items-center text-white'> 
      <Lottie options={defaultOptions} height={400} width={500} />
      </div>}
      <Online />
      <div className="bg-white text-black">
        <div className="mx-3">
          <Tabs
            className="flex px-2 items-center  justify-start"
            ref={tabsRef}
            onActiveTabChange={(tab) => setActiveTab(tab)}
          >
            {data.map((sec, index) => (
              <Tabs.Item title={sec.title} key={index} active={activeSection === sec.id} />
            ))}
          </Tabs>
        </div>
        <div className="flex flex-row justify-between px-2 gap-2 h-screen">
          <div className="w-1/2 h-screen overflow-y-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell className="bg-blue-800 text-white font-bold subpixel-antialiased text-lg text-center">
                  Commands
                </Table.HeadCell>
              </Table.Head>
            </Table>

            {filteredCommands.map((item, index) => (
              <CommandTable item={item} key={index} callback={handleOutput} />
            ))}
          </div>
          <div
            ref={logRef}
            className="w-5/6 h-screen rounded-t-xl bg-black  overflow-clip scroll-auto overflow-y-auto"
          >
            <OutputLogs output={output} />
          </div>
        </div>
      </div>
     <div className='mt-2'>
      <Footer/>
     </div>
    </div>
  )
}

export default Commands
