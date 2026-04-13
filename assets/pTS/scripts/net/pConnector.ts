//
//import proto from '../../proto/proto.js'
//import { EDITOR } from 'cc/env'
//
//if(!EDITOR) {
//    console.log("ENTER")
//    const socket = new WebSocket('ws://localhost:8080/ws')
//    socket.binaryType = 'arraybuffer'
//
//    socket.onopen = () => {
//        console.log('WebSocket connection established')
//    }
//
//    socket.onmessage = (event) => {
//        const buffer = new Uint8Array(event.data)
//        const message = proto.main.TickMessage.decode(buffer)
//
//        console.log('Received message:', message)
//    }
//}
