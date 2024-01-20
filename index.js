const app = require("./app");
require("dotenv").config();
const http = require('http');
const { Server: SocketServer } = require('socket.io');
const express = require('express');


const server = http.createServer(app);



const io = new SocketServer(server ,{
    cors: {
       origin: "http://localhost:5173"
    }
});

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');


});



server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

