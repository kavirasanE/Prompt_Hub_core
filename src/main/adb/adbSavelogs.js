const Promise = require('bluebird')
const WebSocket = require('ws')
const adb = require('adbkit')
const client = adb.createClient({ host: '127.0.0.1', port: 5037 })
const wss = new WebSocket.Server({ port: 3000 })
const fs = require('fs')
const path = require('path')

// let deviceLogs = {}

const writeLogtoFile = (fileLocation, deviceId, log) => {
  let date = new Date()
  const datePart = date.toISOString().split('T')[0].replace(/-/g, '_')
  const fileName = `${deviceId}_${datePart}.txt`
  const filePath = path.join(fileLocation, fileName)
  fs.appendFile(filePath, log + '\n', (err) => {
    if (err) {
      console.log('error in writing file see adb sav logs,js', err)
    }
  })
}

const adbSavelogs = (filelocation) => {
  wss.on('connection', (ws) => {
    handleLogs(filelocation, (deviceId, result) => {
      // console.log(deviceId)
      if (result) {
        // addLogEntry(deviceId, result)
        writeLogtoFile(filelocation, deviceId, result)
        ws.send(JSON.stringify( {deviceId, result }))
      }
    })
    ws.on('close', () => {
      console.log('Client disconnected from WebSocket server')
    })
  })
}

const handleLogs = (fileLocation, callback) => {
  const command = { FOS: 'logcat -v threadtime', vega: 'journalctl -f' }
  const out = command.vega

  client
    .listDevices()
    .then((devices) => {
      console.log(devices)
      return Promise.map(devices, (device) => {
        // console.log(devices,"inside promises")
        return client.shell(device.id, out).then((stream) => {
          stream.on('data', (data) => {
            const result = data.toString().trim()
            if (result.includes('journalctl: not found')) {
              client.shell(device.id, command.FOS).then((fosStream) => {
                fosStream.on('data', (data) => {
                  const fosResult = data.toString().trim()
                  callback(device.id, fosResult)
                })
              })
            } else {
              callback(device.id, result)
            }
          })
          stream.on('error', (err) => {
            console.error('Stream error:', err)
          })
          stream.on('end', () => {
            console.log('Stream ended')
          })
        })
      })
    })
    .then(() => {
      console.log('Done.')
    })
    .catch((err) => {
      console.error('Something went wrong:', err.stack)
    })
}


export default adbSavelogs
