var Promise = require('bluebird')
var adb = require('adbkit')
var client = adb.createClient({ host: '127.0.0.1', port: 5037 })

let m = 'cat /etc/os-release'
function adbCommands(message, callback) {
  client
    .listDevices()
    .then(function (devices) {
      return Promise.map(devices, function (device) {
        // return client.shell(device.id, 'echo $RANDOM')
        return (
          client
            .shell(device.id, message)
            // Use the readAll() utility to read all the content without
            // having to deal with the events. `output` will be a Buffer
            // containing all the output.
            .then(adb.util.readAll)
            .then(function (output) {
              const result = Buffer.from(output).toString().trim()
              if (
                result != '/bin/bash: undefined: command not found' &&
                result != '/bin/bash: getprop: command not found'
              ) {
                // console.log(result, 'from adb commands backend')
                if (callback) callback(null, result)
              } else {
                adbCommands(m, callback)
              }
            })
        )
      })
    })
    .then(function () {
      // console.log('Done.')
    })
    .catch(function (err) {
      console.error('Something went wrong:', err.stack)
      // if (callback) callback(err)
    })
}
export default adbCommands
