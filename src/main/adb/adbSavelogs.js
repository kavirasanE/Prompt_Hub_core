
const Promise = require('bluebird')
const WebSocket = require('ws')
const adb = require('adbkit')
const client = adb.createClient({ host: '127.0.0.1', port: 5037 })
const wss = new WebSocket.Server({ port: 3000 })
const fs = require('fs')
const path = require('path')

const writeLogtoFile = (fileLocation, log) => {
  fs.appendFile(fileLocation, log + '\n', (err) => {
    if (err) {
      console.log('error in writing file', err)
    }
  })
}

let fileName = ''

// Function to handle ADB logs
const adbSavelogs = (filelocation) => {
  // console.log(filelocation, 'from adbSavelogs')
  wss.on('connection', (ws) => {
    // console.log('Client connected to WebSocket server')
    handleLogs(filelocation, (result) => {
      // console.log(result)
      if (result) {
        let date = new Date()
        const datePart = date.toISOString().split('T')[0].replace(/-/g, '_')
        fileName += '_' + datePart
        const fileLocation = path.join(filelocation, fileName + '.txt')
        // console.log(fileLocation)
        writeLogtoFile(fileLocation, result)
        ws.send(JSON.stringify(result))
      }
    })

    ws.on('close', () => {
      // console.log('Client disconnected from WebSocket server')
    })
  })
}

const handleLogs = (filelocation, callback) => {
  const command = { FOS: 'logcat -v threadtime', vega: 'journalctl -f' }
  const out = command.vega

  client
    .listDevices()
    .then((devices) => {
      return Promise.map(devices, (device) => {
        return client.shell(device.id, out).then((stream) => {
          stream.on('data', (data) => {
            const result = data.toString().trim()
            if (result.includes('journalctl: not found')) {
              client.shell(device.id, command.FOS).then((fosStream) => {
                fosStream.on('data', (data) => {
                  fileName = device.id
                  const fosResult = data.toString().trim()
                  callback(fosResult)
                })
              })
            } else {
              callback(result)
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
