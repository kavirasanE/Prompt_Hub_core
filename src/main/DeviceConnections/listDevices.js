var adb = require('adbkit')
var client = adb.createClient({ host: '127.0.0.1', port: 5037 })

function listDevices(callback) {
  client.listDevices().then(function (listDevice) {
    // console.log(listDevice, "from list Devices")
    if(callback) return callback(listDevice);
  })
}

export default listDevices
