const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })
import adbShellCommands from './adb/adbShellCommands'


function webSocketServer(serializedCommand, device) {
  let command = [serializedCommand];
 
  wss.on('connection', (ws) => {
    // console.log(command,"command from websocket array")
    let updatedCommand = command.splice(0,1);
    let last = updatedCommand[0]
    // console.log(updatedCommand, 'from updated Command from websocket 8th line')
    // console.log('Client connected')
    adbShellCommands(last, device, (result) => {
      ws.send(JSON.stringify(result))
    })
    ws.on('close', () => {
      console.log('Client disconnected')
    })
  })
} 




export default webSocketServer



