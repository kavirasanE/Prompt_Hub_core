// const { spawn } = require('child_process')

// function adbLogcatCommands(runningCommand, callback) {
//   console.log(runningCommand)
//   const [cmd, ...args] = runningCommand.split(' ')
//   const child = spawn(cmd, args)

//   child.on('exit', (code, signal) => {
//     console.log(`Child process exited with code ${code} and signal ${signal}`)
//   })

//   child.stdout.on('data', (data) => {
//     // Convert buffer to string and send to callback
//     let output = data.toString();
//     const result = callback(output);
//     // console.log(result);
//   });

//   child.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`)
//   })

//   child.on('error', (error) => {
//     console.error(`Error: ${error}`)
//   })
// }

// export default adbLogcatCommands


const logcat = require('adbkit-logcat')
const { spawn } = require('child_process')
function adbLogcatCommands({runningCommand, callback}) {
   let reader;
  // Retrieve a binary log stream
  const proc = spawn('adb', [runningCommand])

  // Connect logcat to the stream
  reader = logcat.readStream(proc.stdout)
  reader.on('entry', (entry) => {
    // console.log(entry.message)
    callback(entry.message);
  })

  // Make sure we don't leave anything hanging
  process.on('exit', () => {
    proc.kill()
  })
}
export default adbLogcatCommands
