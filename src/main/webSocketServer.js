const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })
import adbShellCommands from './adb/adbShellCommands'


function webSocketServer(serializedCommand, device) {
  let command = [serializedCommand];
    let dsn =device
  wss.on('connection', (ws) => {
    // console.log(serializedCommand,"command from websocket array")
    let updatedCommand = command.splice(0,1);
    let last = updatedCommand[0]
    // console.log(dsn,"from websocket 13")
    // console.log(last, 'from updated Command from websocket 8th line')
    // console.log('Client connected')
    adbShellCommands( dsn,last, (result) => {
      ws.send(JSON.stringify(result))
    })
    ws.on('close', () => {
      console.log('Client disconnected')
    })
  })
} 




export default webSocketServer



