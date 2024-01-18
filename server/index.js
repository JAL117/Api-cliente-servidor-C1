import express from "express";
import {Server as SocketServer} from "socket.io"
import http from 'http'
import { Socket } from "dgram";
import { log } from "console";

const app = express()
const server =http.createServer(app)
const io = new SocketServer(server)

io.on('connection',Socket=> {
    console.log('Client connected');
})
app.listen(3000)
console.log("Server on port",3000);