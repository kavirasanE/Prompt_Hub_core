var Promise = require('bluebird')
var adb = require('adbkit')
var client = adb.createClient({ host: '127.0.0.1', port: 5037 })

let activeStream = null
const  adbShellCommands = (message, device, callback)  => {
  let commandMessage = ''
  console.log(message, 'from adb shell command')
  console.log(device, 'this the device dsn from backend')
  commandMessage = message

  // console.log(commandMessage, ' after buffer')

  clearStream(activeStream)

  // if (activeStream) {
  // }
  let DSN = device
  client.listDevices()
  // .then(function (DSN) {
  // return Promise.map(devices, function (device) {
  return (
    client
      .shell(DSN, commandMessage)
      // .then(adb.util.readAll)
      .then(function (stream) {
        //  stream.destroy()

        activeStream = stream

        let outputBuffer = ''
       
        stream.on('data', function (data) {
          DSN = ' '
          const output = data.toString('utf-8').trim()
          outputBuffer += output
          if (callback) callback(outputBuffer, 'this is from backend')
        })
        
        stream.on('error', function (err) {
          console.error(`Error on device ${device}:`, err.stack)
          if (callback) callback(err)
        })
        
        stream.on('end', function () {
          DSN = null
          clearStream(stream)
          console.log(`Stream ended for device ${device}`)
        })
      })
      .catch(function (err) {
        console.error(`Error on device ${device}:`, err.stack)
        if (callback) callback(err)
      })
      // })
      // })
      .then(function () {
        console.log('All commands executed.')
      })
      .catch(function (err) {
        console.error('Something went wrong:', err.stack)
        if (callback) callback(err)
      })
  )
// })
}

function clearStream(stream) {
  if (stream) {
    stream.pause()
    stream.removeAllListeners()
    stream.end()
    stream.destroy()
  }
}

export default adbShellCommands


