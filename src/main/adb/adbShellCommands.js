var Promise = require('bluebird')
var adb = require('adbkit')
var client = adb.createClient({ host: '127.0.0.1', port: 5037 })

let activeStream = null

function adbShellCommands(message, device, callback) {
  let commandMessage = ' '
  // console.log(message, "from adb shell command");
  console.log(device)
  commandMessage = message
  // console.log(commandMessage, ' after buffer')

  
    if (activeStream) {
      clearStream(activeStream)
    }
 
  client.listDevices()
  // .then(function (devices) {
  // return Promise.map(devices, function (device) {
  return (
    client
      .shell(device, message)
      // .then(adb.util.readAll)
      .then(function (stream) {
        //  stream.destroy()
        activeStream = stream
        let outputBuffer = ''
     setTimeout(() => {

       stream.on('data', function (data) {
         const output = data.toString('utf-8').trim()
        outputBuffer += output
      
      if (callback) callback(outputBuffer, 'this is from backend')
      })
    },100)

        stream.on('error', function (err) {
          console.error(`Error on device ${device}:`, err.stack)
          if (callback) callback(err)
        })

        stream.on('end', function () {
          console.log(`Stream ended for device ${device}`)
          clearStream(stream)
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
