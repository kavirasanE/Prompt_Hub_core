import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import trackDevice from '../main/trackDevice'
import adbCommands from '../main/adb/adbCommands'
import listDevices from '../main/DeviceConnections/listDevices'
// Custom APIs for renderer
const api = {}
const socket = {
  message: 'getprop | grep build',
  user: 'Alice',
  device: function (callback) {
    adbCommands(this.message, callback)
  }
}
const deviceConnect = {
  message: 'getprop | grep build',
  // message2: 'cat /etc/os-release',
  // message: {fos:'getprop | grep build' , vega:'cat /etc/os-release'},
  device: function (callback) {
    adbCommands(this.message,callback)
  },
  connectedDevice: function (callback) {
    trackDevice(callback)
  }
}

const listDevice = {
  deviceList: function (callback) {
    listDevices(callback)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api),
      contextBridge.exposeInMainWorld('socket', socket),
      contextBridge.exposeInMainWorld('deviceConnect', deviceConnect),
      contextBridge.exposeInMainWorld('listDevice', listDevice)
  } catch (error) {
    console.error(error)
  }
} else {
  ;(window.electron = electronAPI),
    (window.api = api),
    (window.socket = socket),
    (window.deviceConnect = deviceConnect),
    (window.listDevice = listDevice)
}
