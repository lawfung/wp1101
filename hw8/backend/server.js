import WebSocket from 'ws';
import http from 'http'
import express from 'express';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import {sendData, sendStatus, initData, broadcastMessage} from './wssConnect';
import Message from './models/message';

dotenv.config();
if(!process.env.MONGO_URL) {
    console.log("Missing MONGO_URL")
}
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

db.once('open', () => {
    wss.on('connection', (ws) => {
        initData(ws)
        ws.onmessage = async (byteString) => {
            const { data } = byteString
            const [task, payload] = JSON.parse(data)
            switch (task) {
                case 'input': {
                    const { name, body } = payload
                    const message = new Message({ name, body })
                    try { await message.save(); } 
                    catch (e) { throw new Error ("Message DB save error: " + e); }
                    broadcastMessage(['output', [payload]], {type: 'success', msg: 'Message sent.'}, wss)
                    // sendData(['output', [payload]], ws)
                    // sendStatus({type: 'success', msg: 'Message sent.'}, ws)
                    break
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        broadcastMessage(['cleared'], { type: 'info', msg: 'Message cache cleared.'}, wss)
                        // sendData(['cleared'], ws)
                        // sendStatus({ type: 'info', msg: 'Message cache cleared.'}, ws)
                    })
                    break
                }              
                default: break
            }
        }
    })

    const PORT = process.env.port || 4000

    server.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    })
})
