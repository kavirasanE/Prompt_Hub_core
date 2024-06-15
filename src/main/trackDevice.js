var adb = require('adbkit')
var client = adb.createClient({ host: '127.0.0.1', port: 5037 })

function trackDevice(callback) {
  client
    .trackDevices()
    .then(function (tracker) {
      tracker.on('add', function (device) {
        device.status ='plug'
        console.log('Device  was plugged in', device)
        if (callback) callback(device)
      })
      tracker.on('remove', function (device) {
        device.status ='unplug',
        console.log('Device  was unplugged', device)
        if (callback) callback(device)
      })
      tracker.on('end', function () {
        console.log('Tracking stopped')
      })
    })
    .catch(function (err) {
      console.error('Something went wrong:', err.stack)
    })

  console.log('Device Connected')
}

export default trackDevice
