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
  
  const data = 
  [
    {
      "id": 0,
      "title": "GeneralCommands",
      "commands": [
        {
          "command": "dumpsys activity service WhadService",
          "description": "Dumpsys command for CSM/FTV devices to know ASD, ASD score, TSS."
        },
        {
          "command": "lipc-probe -v com.doppler.whad command",
          "description": "Dumpsys command for Puffin devices to know ASD, ASD score, TSS."
        },
        {
          "command": "setprop persist.amazon.whad.tsm_score 255",
          "description": "Forcing specific device to be TSS (Time Sync Server)."
        },
        {
          "command": "logcat | grep -i \"updateState\"",
          "description": "To check update flow (This will show update status from Downloading to successful)."
        },
        {
          "command": "am startservice -a com.amazon.device.software.ota.service.CHECK_FOR_UPDATES -n com.amazon.device.software.ota/.OtaService",
          "description": "To check and force app OTA download to your device."
        },
        {
          "command": "am startservice -a com.amazon.device.software.ota.service.START_OBTRUSIVE -n com.amazon.device.software.ota/.OtaService",
          "description": "Command to start installation."
        },
        {
          "command": "logcat -v threadtime | grep -i \"DashMediaSource\"",
          "description": "To check DRM wide_Entitlement."
        },
        {
          "command": "logcat -v threadtime | grep -I DRM_GroupLicense_LicenseFetchAttempts",
          "description": "To check DRM group license/widevine_entitlement."
        },
        {
          "command": "logcat -v threadtime | grep -i HttpAudioFetcher:sendAbrAttributes",
          "description": "To check Katana loglines from AMU music (e.g., where music is playing in 3D, R360, HD, UHD Content)."
        },
        {
          "command": "logcat | grep -ioE 'groupkeyid=[^,]+|drm=[^&]+|DRM_GroupLicense_LoadKeys[^,]+|DRM_GroupLicense_LicenseFetchAttempts|removeAllSessions:session cached|protectionScheme=[^,]+|createSession:Creating a new session'",
          "description": "Used to check all DRM related loglines."
        },
        {
          "command": "logcat -v threadtime | grep -i \"processGaplessMuxEndOfStream\"",
          "description": "To check GaplessMuxEndOfStream loglines."
        },
        {
          "command": "logcat -v threadtime | grep -i processGaplessMuxNewTrackSameStream",
          "description": "To check Gapless Mux Start Of the Stream loglines."
        },
        {
          "command": "logcat -v threadtime | grep -i 'DemuxedFrameSourceImp'",
          "description": "To check Offset loglines command."
        },
        {
          "command": "setprop persist.amazon.whad.ismaster 1",
          "description": "Forcing the specific Device to be ASD, only for CSM devices."
        },
        {
          "command": "lipc-set-prop -i com.doppler.whad distributionMasterScoreOverride 500",
          "description": "Forcing the specific Device to be ASD, only for Puffin devices."
        },
        {
          "command": "logcat | grep volume",
          "description": "To check Volume level on the devices."
        },
        {
          "command": "logcat -v threadtime | grep -i \"disContinuityFound\"",
          "description": "To check discontinuity logs for Tune in station."
        },
        {
          "command": "adb logcat -v threadtime | grep -i skew",
          "description": "To check the BT skew values."
        },
        {
          "command": "getprop | grep build",
          "description": "To check Device build details."
        },
        {
          "command": "logcat |grep -i \"using DemuxedDataSource\"",
          "description": "To check demux (Tunein HLS)."
        }
      ]
    },
    {
      "id": 1,
      "title": "FTVCommands",
      "commands": [
        {
          "command": "dumpsys package com.amazon.alexamediaplayer.runtime.ftv | grep versionName",
          "description": "To Verify AMP-R (amazon media player) APK Details"
        },
        {
          "command": "dumpsys package com.amazon.vizzini | grep versionCode",
          "description": "To Verify Vizzini APK Details"
        },
        {
          "command": "dumpsys package com.amazon.firebat | grep versionCode",
          "description": "To Verify Firebat APK Details"
        },
        {
          "command": "dumpsys package com.amazon.avod | grep versionCode",
          "description": "To Verify AVOD APK Details"
        },
        {
          "command": "logcat -v threadtime | grep -i SoftAP",
          "description": "To Verify Soft_AP in Kaine/Kara"
        },
        {
          "command": "dumpsys package com.amazon.tv.settings.v2 | grep versionName",
          "description": "To verify JARVIS APK Details"
        },
        {
          "command": "logcat -v threadtime | grep -i skew",
          "description": "To verify Skew value for Lip Sync In FTV"
        }
      ]
    },
    {
      "id": 2,
      "title": "Spotify Commands",
      "commands": [
        {
          "command": "dumpsys package com.amazon.spotify.mediabrowserservice | grep version",
          "description": "To check Spotify SMBS apk details"
        },
        {
          "command": "logcat -v threadtime | grep -i SpotifyESDKAdapter:streamStarted",
          "description": "To check spotify ESDK Vorbis log lines"
        },
        {
          "command": "setprop persist.amazon.spotify.hifi 1",
          "description": "To enable HIFI need to install this command on every devices in your cluster then Reboot"
        },
        {
          "command": "setprop persist.spotify.version current_flac_mrm",
          "description": "to enable flac in spotify"
        },
        {
          "command": "reboot",
          "description": "to reboot the device"
        }
      ]
    },
    {
      "id": 3,
      "title": "Tuple Devices Commands",
      "commands": [
        {
          "command": "logcat -v threadtime | grep -i freq",
          "description": "To verify the frequency in pablo device"
        },
        {
          "command": "logcat -v threadtime | grep -i config",
          "description": "To check L/R Effort loglines in tuple device for stereo mode"
        },
        {
          "command": "logcat | grep \"proxy_effect_dap-profile\"",
          "description": "Only for Octave Tuple in stereo mode"
        },
        {
          "command": "logcat -v threadtime |grep -i band",
          "description": "To check Midrange/Treble/Base"
        }
      ]
    },
    {
      "id": 4,
      "title": "Hypnos Galileo Commands",
      "commands": [
        {
          "command": "journalctl -f",
          "description": "checking running logs on console"
        },      
        {
          "command": "cat /etc/os-release | grep BUILD_DESC | sed -n \"s/^.*\\/\\([0-9]*\\).*/\\1/p\"",
          "description": "To check build details"
        },
        {
          "command": "cat /etc/os-release | grep VERSION_NUMBER | sed -n \"s/^.*=.\\([0-9]*\\).*/\\1/p\"",
          "description": "To check version Number"
        },
        {
          "command": "cat /etc/os-release",
          "description": "To check full details"
        },
       
        {
          "command": "pull /var/log",
          "description": "To provide full device logs"
        },
       
        {
          "command": "audio_manager_get_prop MainVolume",
          "description": "To check volume for hypnos/galileo"
        },
        {
          "command": "aipc-set-prop -in com.amazon.softwareupdate.service checkForUpdates 1",
          "description": "To initiate OTA for Hypnos & Galileo"
        },
        {
          "command": "aipc-get-prop -sn com.amazon.softwareupdate.service firmwareStatus",
          "description": "To Check OTA status"
        }
      ]
    },
    {
      "id": 5,
      "title": "LowPowerMode",
      "commands": [
        {
          "command": "pwrsvc_cli -c stats",
          "description": "command is “Stats Command” which gives us the list of resources which are holding the wake lock and due to which the LPM device came out of LPM mode."
        },
        {
          "command": "setprop persist.amazon.whad.max_pause 15",
          "description": "When a MRM playback is initiated in the cluster, the “Puffinmrmd” resource holds wake lock. Once the playback is stopped, it will take ideally 2 Hrs, using set of commands we can reduce the wait time to 15-20 seconds instead of 2 hrs"
        },
        {
          "command": "ps | grep -i puffin",
          "description": "This command is used to get the process id (PID) of puffinmrmd resource in the LPM device."
        },
        // {
        //   "command": "kill -9 <Process ID to be entered here>",
        //   "description": "This command restart the puffinmrmd resource by killing the existing puffinmrmd"
        // },
        {
          "command": "logcat -b all | grep -iE \"perflock mode switch type=cpu|network mode=\"",
          "description": "To Check whether the device enters into full/partial LPM mode by using this command."
        }
      ]
    },
    {
      "id": 6,
      "title": "MP_SM_Commands",
      "commands": [
        {
          "command": "dumpsys package com.amazon.aria | grep versionName",
          "description": "To check Aria APk version details"
        },
        {
          "command": "dumpsys package com.amazon.aria | grep versionCode",
          "description": "To check Aria APk version details"
        },
        {
          "command": "logcat |grep -i \"MRMServerTrack:setSource\"",
          "description": "To check whether MC (media convergence) is enabled or not"
        }
      ]
    },
    {
      "id": 7,
      "title": "Longevity",
      "commands": [
        {
          "command": "aipc-set-prop -i com.doppler.OTAUpdate updatePriority 1",
          "description": "Initiate OTA for Puffin devices"
        },
        {
          "command": "logcat -v threadtime  | grep -i ota",
          "description": "To check OTA Happening"
        },
        {
          "command": "logcat -v threadtime | grep - i playing",
          "description": "To check whether Music is playing or Not."
        },
        {
          "command": "am broadcast -a amazon.speech.SEND_TO_SIM --es ttsText \"\\\"Alexa, Play KUOW FM from tunein on party time group\\\"\"",
          "description": "Inject command to Initiate longevity via command"
        },
        {
          "command": "am broadcast -a amazon.speech.SEND_TO_SIM --es ttsText \"\\\" Alexa, set volume to two on party time group\\\"\"",
          "description": "Inject command to set volume in longevity via command"
        },
        {
          "command": "am broadcast -a amazon.speech.SEND_TO_SIM --es ttsText \"\\\"Alexa, stop KUOW FM from tunein on party time group\\\"\"",
          "description": "Inject command to stop longevity via command"
        },
        {
          "command": "logcat -v threadtime | grep - i stutter",
          "description": "To check stutter is observed during longrun."
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


// const data = [
//   {
//     id: 0,
//     title: "General Commands",
//     commands: [
//       {
//         command: "idme print locale",
//         description: "Print the locale setting of the device"
//       },
//       {
//         command: "getprop | grep build",
//         description: "to Check Build Details"
//       },
//       {
//         command: "cat /data/misc/bluedroid/bt_config.conf",
//         description: "Display the Bluetooth configuration"
//       },
//       {
//         command: "cat /data/misc/wifi/wpa_supplicant.conf",
//         description: "Display the WiFi configuration"
//       },
//       {
//         command: "lipc-get-prop com.doppler.audiod MainVolume",
//         description: "Get the main volume of the device"
//       },
//       {
//         command: "aipc-get-prop -s com.amazon.puffin wakeword",
//         description: "Get the wake word setting of the device"
//       },
//       {
//         command: "logcat | grep -i nearmiss",
//         description: "Filter logcat output for 'nearmiss'"
//       },
//        {
//         command: "ps | grep led",
//         description: "Find LED processes"
//       },
//       {
//         command: "ls -l /data/acedropbox",
//         description: "List contents of /data/acedropbox directory"
//       }
//     ]
//   },
//   {
//     id: 1,
//     title: "Fastboot Commands",
//     commands: [
//       {
//         command: "fastboot devices",
//         description: "List devices in fastboot mode"
//       },
//       {
//         command: "fastboot reboot",
//         description: "Reboot the device from fastboot mode"
//       }
//     ]
//   },
//   {
//     id: 2,
//     title: "Widevine Commands",
//     commands: [
//       {
//         command: "aipc-get-prop -s com.amazon.puffin AudioPlayerTrackProtectionType",
//         description: "Get Widevine track protection type for a specific device"
//       }
//     ]
//   },
//   {
//     id: 3,
//     title: "Language and Wake Word Commands",
//     commands: [
//       {
//         command: "idme locale en-US",
//         description: "Set the locale to en-US"
//       },
//       {
//         command: "aipc-get-prop -s com.amazon.puffin wakeword",
//         description: "Get the wake word setting"
//       }
//     ]
//   },
//   {
//     id: 4,
//     title: "Audio Commands",
//     commands: [
//       {
//         command: "cat /data/mixer_meta/audiodVolumes",
//         description: "Display mixer data volumes"
//       },
//       {
//         command: "logcat -v threadtime | grep -I volume",
//         description: "Filter logcat output for volume"
//       },
//       {
//         command: "logcat -v threadtime | grep -i HttpAudioFetcher:sendAbrAttributes",
//         description: "Check FLAC attributes in Katana"
//       }
//     ]
//   },
//   {
//     id: 5,
//     title: "DAVS Commands",
//     commands: [
//       // {
//       //   command: "cd data/davs/resources/",
//       //   description: "Change directory to DAVS resources"
//       // },
//       // {
//       //   command: "cd data/davs/requests/",
//       //   description: "Change directory to DAVS requests"
//       // },
//       // {
//       //   command: "ls -l",
//       //   description: "List files in the directory"
//       // }
//     ]
//   },
//   {
//     id: 6,
//     title: "Flash Commands",
//     commands: [
//       {
//         command: "python3 flashimage.py --aserial G2A0WK02821600DH --fserial G2A0WK02821600DH",
//         description: "Flash image to a specific device"
//       },
//       {
//         command: "python flashimage.py --skipdata",
//         description: "Flash image without registering"
//       }
//     ]
//   },
//   {
//     id: 7,
//     title: "Spotify Commands",
//     commands: [
//       {
//         command: "am startservice -a com.amazon.device.software.ota.service.CHECK_FOR_UPDATES -n com.amazon.device.software.ota/.OtaService",
//         description: "Check for OTA updates"
//       },
//       {
//         command: "am startservice -a com.amazon.device.software.ota.service.START_OBTRUSIVE -n com.amazon.device.software.ota/.OtaService",
//         description: "Start OTA service obtrusively"
//       },
//       {
//         command: "logcat | grep -i \"updateState\"",
//         description: "Filter logcat output for update state"
//       },
//       {
//         command: "dumpsys package com.amazon.spotify.mediabrowserservice | grep version",
//         description: "Check Spotify SMBS apk details"
//       }
//     ]
//   },
//   {
//     id: 8,
//     title: "Logs Upload Commands",
//     commands: [
//       // {
//       //   command: "ls -l \\data\\logd",
//       //   description: "List logd directory contents"
//       // },
//       // {
//       //   command: "ls -l \\data\\system\\dropbox",
//       //   description: "List Dropbox directory contents"
//       // },
//       {
//         command: "logcat -v threadtime | grep -i upload",
//         description: "Filter logcat output for upload"
//       }
//     ]
//   },
//   {
//     id: 9,
//     title: "Client Policy Commands",
//     commands: [
//           {
//         command: "# stop ahe",
//         description: "Stop AHE service"
//       },
//       {
//         command: "# start ahe",
//         description: "Start AHE service"
//       }
//     ]
//   },
//   {
//     id: 10,
//     title: "Miscellaneous Commands",
//     commands: [
//       {
//         command: "po tab",
//         description: "PO tab command"
//       },
//       {
//         command: "ex tab",
//         description: "EX tab command"
//       }
//     ]
//   },
//   {
//     id: 11,
//     title: "Recovery Commands",
//     commands: [
//       {
//         command: "fastboot oem flags dev_flags:0x0000",
//         description: "Recover device"
//       }
//     ]
//   },
//   {
//     id: 12,
//     title: "Low Power Mode Commands",
//     commands: [
//       {
//         command: "pwrsvc_cli -c stats",
//         description: "Check low power mode stats"
//       }
//     ]
//   },
//   {
//     id: 13,
//     title: "Gapless Playback Commands",
//     commands: [
//       {
//         command: "logcat -v threadtime | grep -i processGaplessMuxEndOfStream",
//         description: "Check gapless mux end of stream"
//       }
//     ]
//   },
//   {
//     id: 14,
//     title: "FSM Audio Player Commands",
//     commands: [
//       {
//         command: "logcat -v threadtime | grep -i FSMAudioPlayer",
//         description: "Filter logcat output for FSM audio player"
//       }
//     ]
//   }
// ];















// const data = [
//   {
//     "title": "Inject Audio Utterances",
//     "id": 0,
//     "commands": [
//       {
//         "command": "lipc-set-prop com.doppler.audio inject_audio </tmp/wav_file_16kHz>",
//         "description": "Inject Audio Utterances"
//       },
//       {
//         "command": "First Push the wav to /tmp/ dir on device\nam startservice -n com.amazon.knight.test.support/.SpeechInjectorService (For Headless)\nam broadcast -a amazon.speech.SEND_FILE_TO_WW --es audioPath </sdcard/wav_file>",
//         "description": "Inject Audio Utterances"
//       }
//     ]
//   },
//   {
//     "title": "Inject Text Utterances",
//     "id": 1,
//     "commands": [
//       {
//         "command": "sendText 'What Time is It'",
//         "description": "Inject Text Utterances"
//       },
//       {
//         "command": "am startservice -n com.amazon.knight.test.support/.SpeechInjectorService\nam broadcast -a amazon.speech.SEND_TO_SIM --es ttsText 'Alexa, What Time is It'",
//         "description": "Inject Text Utterances"
//       }
//     ]
//   },
//   {
//     "title": "Give you the wake word",
//     "id": 2,
//     "commands": [
//       {
//         "command": "lipc-get-prop com.doppler.asr WWModel",
//         "description": "Give you the wake word"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.GET_WAKEWORD",
//         "description": "Give you the wake word"
//       }
//     ]
//   },
//   {
//     "title": "Set wake word",
//     "id": 3,
//     "commands": [
//       {
//         "command": "lipc-set-prop com.doppler.asr WWModel ALEXA",
//         "description": "Set wake word"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.SET_WAKEWORD --es model <MODEL_NAME>",
//         "description": "Set wake word"
//       }
//     ]
//   },
//   {
//     "title": "Disable wake word",
//     "id": 4,
//     "commands": [
//       {
//         "command": "pm disable amazon.speech.wakewordservice",
//         "description": "Disable wake word"
//       }
//     ]
//   },
//   {
//     "title": "Get audio player state",
//     "id": 5,
//     "commands": [
//       {
//         "command": "lipc-get-prop com.doppler.player AudioPlayerState",
//         "description": "Get audio player state"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.PLAYER_STATE",
//         "description": "Get audio player state"
//       }
//     ]
//   },
//   {
//     "title": "Get URI",
//     "id": 6,
//     "commands": [
//       {
//         "command": "lipc-get-prop com.doppler.player URI",
//         "description": "Get URI"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.GET_URI",
//         "description": "Get URI"
//       }
//     ]
//   },
//   {
//     "title": "Set URI",
//     "id": 7,
//     "commands": [
//       {
//         "command": "lipc-set-prop com.doppler.player URI",
//         "description": "Set URI"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.PLAY_REMOTE --es url <url>",
//         "description": "Set URI"
//       }
//     ]
//   },
//   {
//     "title": "Get Content ID",
//     "id": 8,
//     "commands": [
//       {
//         "command": "lipc-get-prop com.doppler.player ContentId",
//         "description": "Get Content ID"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.GET_URI",
//         "description": "Get Content ID"
//       }
//     ]
//   },
//   {
//     "title": "Stop audio player",
//     "id": 9,
//     "commands": [
//       {
//         "command": "lipc-set-prop com.doppler.player Control Stop",
//         "description": "Stop audio player"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.STOP_PLAY",
//         "description": "Stop audio player"
//       }
//     ]
//   },
//   {
//     "title": "Get TTS player state",
//     "id": 10,
//     "commands": [
//       {
//         "command": "lipc-get-prop com.doppler.alexaSpeechPlayer TTSPlayerState",
//         "description": "Get TTS player state"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.TTS_PLAYER_STATE",
//         "description": "Get TTS player state"
//       }
//     ]
//   },
//   {
//     "title": "Get WiFi state",
//     "id": 11,
//     "commands": [
//       {
//         "command": "lipc-get-prop -s com.lab126.wifid cmState",
//         "description": "Get WiFi state"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.GET_WIFI_STATE",
//         "description": "Get WiFi state"
//       }
//     ]
//   },
//   {
//     "title": "Delete WiFi profile",
//     "id": 12,
//     "commands": [
//       {
//         "command": "lipc-set-prop -s com.lab126.wifid deleteProfile <ssid>",
//         "description": "Delete WiFi profile"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.DELETE_PROFILE --es essid <ssid>",
//         "description": "Delete WiFi profile"
//       }
//     ]
//   },
//   {
//     "title": "Get current WiFi SSID",
//     "id": 13,
//     "commands": [
//       {
//         "command": "lipc-hash-prop -n com.lab126.wifid currentEssid",
//         "description": "Get current WiFi SSID"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.CURRENT_ESSID",
//         "description": "Get current WiFi SSID"
//       }
//     ]
//   },
//   {
//     "title": "Connect to WiFi profile",
//     "id": 14,
//     "commands": [
//       {
//         "command": "lipc-set-prop -s com.lab126.wifid cmConnect <profile essid>",
//         "description": "Connect to WiFi profile"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.CONNECT --es essid <essid>",
//         "description": "Connect to WiFi profile"
//       }
//     ]
//   },
//   {
//     "title": "Create WiFi profile",
//     "id": 15,
//     "commands": [
//       {
//         "command": "lipc-hash-prop com.lab126.wifid createProfile { essid = 'CIC-WPA2', secured = 'yes', smethod = 'wpa2', psk = 'cic1broadway', wps = 'no' } ctrl+d",
//         "description": "Create WiFi profile"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.CREATE_PROFILE --es profile '{\"essid\": \"Echo_QA_5\"}'",
//         "description": "Create WiFi profile"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.CREATE_PROFILE --es profile '{\"essid\": \"Echo_QA_5\", \"psk\": \"labone2six\"}'",
//         "description": "Create WiFi profile"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.CREATE_PROFILE --es profile '{\"essid\": \"Echo_QA_5\", \"psk\": \"labone2six\", \"smethod\": \"wpa\"}'",
//         "description": "Create WiFi profile"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.CREATE_PROFILE --es profile '{\"essid\": \"Echo_QA_5\", \"psk\": \"labone2six\", \"smethod\": \"wpa2\"}'",
//         "description": "Create WiFi profile"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.CREATE_PROFILE --es profile '{\"essid\": \"Echo_QA_5\", \"psk\": \"labone2six\", \"smethod\": \"wep\"}'",
//         "description": "Create WiFi profile"
//       }
//     ]
//   },
//   {
//     "title": "Start WiFi scan",
//     "id": 16,
//     "commands": [
//       {
//         "command": "lipc-set-prop -s com.lab126.wifid scan 1",
//         "description": "Start WiFi scan"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.START_SCAN",
//         "description": "Start WiFi scan"
//       }
//     ]
//   },
//   {
//     "title": "Get WiFi scan results",
//     "id": 17,
//     "commands": [
//       {
//         "command": "lipc-hash-prop -n com.lab126.wifid scanList",
//         "description": "Get WiFi scan results"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.SCANNED_WIFI_RESULTS",
//         "description": "Get WiFi scan results"
//       }
//     ]
//   },
//   {
//     "title": "Get WiFi profile data",
//     "id": 18,
//     "commands": [
//       {
//         "command": "lipc-hash-prop -n com.lab126.wifid profileData",
//         "description": "Get WiFi profile data"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.PROFILE_DATA",
//         "description": "Get WiFi profile data"
//       }
//     ]
//   },
//   {
//     "title": "Turn off LED pattern",
//     "id": 19,
//     "commands": [
//       {
//         "command": "lipc-set-prop com.doppler.ledd Pattern off",
//         "description": "Turn off LED pattern"
//       },
//       {
//         "command": "ledctrl -c",
//         "description": "Turn off LED pattern"
//       }
//     ]
//   },
//   {
//     "title": "Get LED pattern",
//     "id": 20,
//     "commands": [
//       {
//         "command": "lipc-get-prop com.doppler.ledd Pattern",
//         "description": "Get LED pattern"
//       },
//       {
//         "command": "ledctrl -g",
//         "description": "Get LED pattern"
//       }
//     ]
//   },
//   {
//     "title": "Get LED gain",
//     "id": 21,
//     "commands": [
//       {
//         "command": "lipc-get-prop com.doppler.ledd AlsLedGain",
//         "description": "Get LED gain"
//       },
//       {
//         "command": "ledctrl -l",
//         "description": "Get LED gain"
//       }
//     ]
//   },
//   {
//     "title": "Set main volume",
//     "id": 22,
//     "commands": [
//       {
//         "command": "lipc-set-prop com.doppler.audiod MainVolume",
//         "description": "Set main volume"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.GET_VOLUME",
//         "description": "Set main volume"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.SET_VOLUME --es volume 10",
//         "description": "Set main volume"
//       }
//     ]
//   },
//   {
//     "title": "Mute device",
//     "id": 23,
//     "commands": [
//       {
//         "command": "lipc-set-prop com.doppler.audiod Mute 0/1",
//         "description": "Mute device"
//       },
//       {
//         "command": "input keyevent KEYCODE_VOLUME_MUTE",
//         "description": "Mute device"
//       }
//     ]
//   },
//   {
//     "title": "Get registration status",
//     "id": 24,
//     "commands": [
//       {
//         "command": "lipc-get-prop com.lab126.DeviceAuthenticationService isRegistered",
//         "description": "Get registration status"
//       },
//       {
//         "command": "am broadcast -a amazon.test.intent.action.IS_REGISTERED",
//         "description": "Get registration status"
//       }
//     ]
//   }
// ]