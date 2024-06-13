var Promise = require('bluebird')
var adb = require('adbkit')
var client = adb.createClient({ host: '127.0.0.1', port: 5037 })

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
              // console.log(output.build.version.extensions.ad_services);
              // console.log(output.build.version.extensions.r);
              // console.log(output.ro.bootimage.build.date);

              // console.log('[%s] %s', device.id, output.toString().trim())
              const result = Buffer.from(output).toString().trim()

              if (callback) callback(null, result)
            })
        )
      })
    })
    .then(function () {
      // console.log('Done.')
    })
    .catch(function (err) {
      console.error('Something went wrong:', err.stack)
      if (callback) callback(err)
    })
}
export default adbCommands