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
  
  // const data = [
  //   {
  //     id: 0,
  //     title: 'GeneralCommands',
  //     commands: [
  //       {
  //         command: 'dumpsys activity service WhadService',
  //         description: 'Dumpsys command for CSM/FTV devices to know ASD, ASD score, TSS.'
  //       },
  //       {
  //         command: 'lipc-probe -v com.doppler.whad command',
  //         description: 'Dumpsys command for Puffin devices to know ASD, ASD score, TSS.'
  //       },
  //       {
  //         command: 'adb shell setprop persist.amazon.whad.tsm_score 255',
  //         description: 'Forcing specific device to be TSS (Time Sync Server).'
  //       },
  //       {
  //         command: 'logcat | grep -i "updateState"',
  //         description:
  //           'To check update flow (This will show update status from Downloading to successful).'
  //       },
  //       {
  //         command:
  //           'am startservice -a com.amazon.device.software.ota.service.CHECK_FOR_UPDATES -n com.amazon.device.software.ota/.OtaService',
  //         description: 'To check and force app OTA download to your device.'
  //       },
  //       {
  //         command:
  //           'am startservice -a com.amazon.device.software.ota.service.START_OBTRUSIVE -n com.amazon.device.software.ota/.OtaService',
  //         description: 'Command to start installation.'
  //       },
  //       {
  //         command: 'logcat -v threadtime | grep -i "DashMediaSource"',
  //         description: 'To check DRM wide_Entitlement.'
  //       },
  //       {
  //         command: 'logcat -v threadtime | grep -I DRM_GroupLicense_LicenseFetchAttempts',
  //         description: 'To check DRM group license/widevine_entitlement.'
  //       },
  //       {
  //         command: 'logcat -v threadtime | grep -i HttpAudioFetcher:sendAbrAttributes',
  //         description:
  //           'To check Katana loglines from AMU music (e.g., where music is playing in 3D, R360, HD, UHD Content).'
  //       },
  //       {
  //         command:
  //           "logcat | grep -ioE 'groupkeyid=[^,]+|drm=[^&]+|DRM_GroupLicense_LoadKeys[^,]+|DRM_GroupLicense_LicenseFetchAttempts|removeAllSessions:session cached|protectionScheme=[^,]+|createSession:Creating a new session'",
  //         description: 'Used to check all DRM related loglines.'
  //       },
  //       {
  //         command: 'logcat -v threadtime | grep -i "processGaplessMuxEndOfStream"',
  //         description: 'To check GaplessMuxEndOfStream loglines.'
  //       },
  //       {
  //         command: 'logcat -v threadtime | grep -i processGaplessMuxNewTrackSameStream',
  //         description: 'To check Gapless Mux Start Of the Stream loglines.'
  //       },
  //       {
  //         command: "logcat -v threadtime | grep -i 'DemuxedFrameSourceImp'",
  //         description: 'To check Offset loglines command.'
  //       },
  //       {
  //         command: 'setprop persist.amazon.whad.ismaster 1',
  //         description: 'Forcing the specific Device to be ASD, only for CSM devices.'
  //       },
  //       {
  //         command: 'lipc-set-prop -i com.doppler.whad distributionMasterScoreOverride 500',
  //         description: 'Forcing the specific Device to be ASD, only for Puffin devices.'
  //       },
  //       {
  //         command: 'logcat | grep volume',
  //         description: 'To check Volume level on the devices.'
  //       },
  //       {
  //         command: 'logcat -v threadtime | grep -i "disContinuityFound"',
  //         description: 'To check discontinuity logs for Tune in station.'
  //       },
  //       {
  //         command: 'adb logcat -v threadtime | grep -i skew',
  //         description: 'To check the BT skew values.'
  //       },
  //       {
  //         command: 'getprop | grep build',
  //         description: 'To check Device build details.'
  //       },
  //       {
  //         command: 'logcat |grep -i "using DemuxedDataSource"',
  //         description: 'To check demux (Tunein HLS).'
  //       }
  //     ]
  //   },
  //   {
  //     id: 1,
  //     title: 'FTVCommands',
  //     commands: [
  //       {
  //         command: 'exampleFTVCommand',
  //         description: 'This is an example command for FTV operations.'
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     title: 'Spotify Commands',
  //     commands: [
  //       {
  //         command: 'dumpsys package com.amazon.spotify.mediabrowserservice | grep version',
  //         description: 'To check Spotify SMBS apk details'
  //       }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     title: 'Tuple Devices Commands',
  //     commands: [
  //       {
  //         command: 'exampleTupleDeviceCommand',
  //         description: 'This is an example command for Tuple device operations.'
  //       }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     title: 'Hypnos Galileo Commands',
  //     commands: [
  //       {
  //         command: 'cat /etc/os-release',
  //         description: 'To check full details.'
  //       },
  //       {
  //         command: `cat /etc/os-release | grep BUILD_DESC | sed -n "s/^.*\\/\\([0-9]*\\).*/\\1/p"`,
  //         description: 'To check build details'
  //     },
  //     {
  //         command: `cat /etc/os-release | grep VERSION_NUMBER | sed -n "s/^.*=.\\([0-9]*\\).*/\\1/p"`,
  //         description: 'To check version Number'
  //     }
  //     ]
  //   },
  //   {
  //     id: 6,
  //     title: 'LowPowerMode',
  //     commands: [
  //       {
  //         command: 'exampleLowPowerModeCommand',
  //         description: 'This is an example command for Low Power Mode operations.'
  //       }
  //     ]
  //   },
  //   {
  //     id: 7,
  //     title: 'MP_SM_Commands',
  //     commands: [
  //       {
  //         command: 'exampleMP_SM_Command',
  //         description: 'This is an example command for MP/SMC operations.'
  //       }
  //     ]
  //   },
  //   {
  //     id: 8,
  //     title: 'Longevity',
  //     commands: [
  //       {
  //         command: 'exampleLongevityCommand',
  //         description: 'This is an example command for Longevity operations.'
  //       }
  //     ]
  //   }
  // ]

  const data = [
    {
      id: 0,
      title: "General Commands",
      commands: [
        {
          command: "idme print locale",
          description: "Print the locale setting of the device"
        },
        {
          command: "getprop | grep build",
          description: "to Check Build Details"
        },
        {
          command: "cat /data/misc/zigbee/zigbee_adapter.txt",
          description: "Display the Zigbee adapter information"
        },
        {
          command: "cat /data/misc/bluedroid/bt_config.conf",
          description: "Display the Bluetooth configuration"
        },
        {
          command: "cat /data/misc/wifi/wpa_supplicant.conf",
          description: "Display the WiFi configuration"
        },
        {
          command: "lipc-get-prop com.doppler.audiod MainVolume",
          description: "Get the main volume of the device"
        },
        {
          command: "aipc-get-prop -s com.amazon.puffin wakeword",
          description: "Get the wake word setting of the device"
        },
        {
          command: "logcat | grep -i nearmiss",
          description: "Filter logcat output for 'nearmiss'"
        },
         {
          command: "ps | grep led",
          description: "Find LED processes"
        },
        {
          command: "ls -l /data/acedropbox",
          description: "List contents of /data/acedropbox directory"
        }
      ]
    },
    {
      id: 1,
      title: "Fastboot Commands",
      commands: [
        {
          command: "fastboot devices",
          description: "List devices in fastboot mode"
        },
        {
          command: "fastboot reboot",
          description: "Reboot the device from fastboot mode"
        }
      ]
    },
    {
      id: 2,
      title: "Widevine Commands",
      commands: [
        {
          command: "adb -s G2A0QU0372520040 shell aipc-get-prop -s com.amazon.puffin AudioPlayerTrackProtectionType",
          description: "Get Widevine track protection type for a specific device"
        }
      ]
    },
    {
      id: 3,
      title: "Language and Wake Word Commands",
      commands: [
        {
          command: "idme locale en-US",
          description: "Set the locale to en-US"
        },
        {
          command: "aipc-get-prop -s com.amazon.puffin wakeword",
          description: "Get the wake word setting"
        }
      ]
    },
    {
      id: 4,
      title: "Audio Commands",
      commands: [
        {
          command: "cat /data/mixer_meta/audiodVolumes",
          description: "Display mixer data volumes"
        },
        {
          command: "logcat -v threadtime | grep -I volume",
          description: "Filter logcat output for volume"
        },
        {
          command: "logcat -v threadtime | grep -i HttpAudioFetcher:sendAbrAttributes",
          description: "Check FLAC attributes in Katana"
        }
      ]
    },
    {
      id: 5,
      title: "DAVS Commands",
      commands: [
        {
          command: "cd data/davs/resources/",
          description: "Change directory to DAVS resources"
        },
        {
          command: "cd data/davs/reques/",
          description: "Change directory to DAVS requests"
        },
        {
          command: "ls -l",
          description: "List files in the directory"
        }
      ]
    },
    {
      id: 6,
      title: "Flash Commands",
      commands: [
        {
          command: "python3 flashimage.py --aserial G2A0WK02821600DH --fserial G2A0WK02821600DH",
          description: "Flash image to a specific device"
        },
        {
          command: "python flashimage.py --skipdata",
          description: "Flash image without registering"
        }
      ]
    },
    {
      id: 7,
      title: "Spotify Commands",
      commands: [
        {
          command: "am startservice -a com.amazon.device.software.ota.service.CHECK_FOR_UPDATES -n com.amazon.device.software.ota/.OtaService",
          description: "Check for OTA updates"
        },
        {
          command: "am startservice -a com.amazon.device.software.ota.service.START_OBTRUSIVE -n com.amazon.device.software.ota/.OtaService",
          description: "Start OTA service obtrusively"
        },
        {
          command: "logcat | grep -i \"updateState\"",
          description: "Filter logcat output for update state"
        },
        {
          command: "dumpsys package com.amazon.spotify.mediabrowserservice | grep version",
          description: "Check Spotify SMBS apk details"
        }
      ]
    },
    {
      id: 8,
      title: "Logs Upload Commands",
      commands: [
        {
          command: "ls -l \\data\\logd",
          description: "List logd directory contents"
        },
        {
          command: "ls -l \\data\\system\\dropbox",
          description: "List Dropbox directory contents"
        },
        {
          command: "logcat -v threadtime | grep -i upload",
          description: "Filter logcat output for upload"
        }
      ]
    },
    {
      id: 9,
      title: "Client Policy Commands",
      commands: [
            {
          command: "# stop ahe",
          description: "Stop AHE service"
        },
        {
          command: "# start ahe",
          description: "Start AHE service"
        }
      ]
    },
    {
      id: 10,
      title: "Miscellaneous Commands",
      commands: [
        {
          command: "po tab",
          description: "PO tab command"
        },
        {
          command: "ex tab",
          description: "EX tab command"
        }
      ]
    },
    {
      id: 11,
      title: "Recovery Commands",
      commands: [
        {
          command: "fastboot oem flags dev_flags:0x0000",
          description: "Recover device"
        }
      ]
    },
    {
      id: 12,
      title: "Low Power Mode Commands",
      commands: [
        {
          command: "pwrsvc_cli -c stats",
          description: "Check low power mode stats"
        }
      ]
    },
    {
      id: 13,
      title: "Gapless Playback Commands",
      commands: [
        {
          command: "logcat -v threadtime | grep -i processGaplessMuxEndOfStream",
          description: "Check gapless mux end of stream"
        }
      ]
    },
    {
      id: 14,
      title: "FSM Audio Player Commands",
      commands: [
        {
          command: "logcat -v threadtime | grep -i FSMAudioPlayer",
          description: "Filter logcat output for FSM audio player"
        }
      ]
    }
  ];


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
      </div>
      }
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
