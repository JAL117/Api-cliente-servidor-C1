const { Server: SocketServer } = require('socket.io');
const express = require('express');
const http = require('http');
const app = require("./app");
require("dotenv").config();

// Definir roomMessages en el alcance global
const roomMessages = {};

// Configurar el servidor HTTP y Socket.IO
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

// Configurar la aplicación Express
app.use(express.static('build'));

// Resto del código del servidor Socket.IO
io.on('connection', (socket) => {

  socket.on('join room', (room) => {
    socket.join(room);
    socket.room = room;

    socket.emit('load messages', roomMessages[room] || []);

    io.to(room).emit('user joined', socket.id);
  });

  socket.on('leave room', () => {
    const room = socket.room;

    if (room) {
      socket.leave(room);
      socket.room = null;

      io.to(room).emit('user left', socket.id);
    }
  });

  socket.on('chat message', (data) => {
    const room = socket.room;

    if (room) {
      roomMessages[room] = roomMessages[room] || [];
      roomMessages[room].push({ message: data.message, sender: socket.id });

      io.to(room).emit('chat message', { message: data.message, sender: socket.id });
    }
  });

  socket.on('get room list', () => {
    const rooms = io.sockets.adapter.rooms;
    const roomList = [
      'Cliente servidor',
      'Arquitectura de software',
      'Inglés V',
      'Matemáticas II',
      'Ética',
    ];

    for (const room in rooms) {
      if (!rooms[room].sockets.hasOwnProperty(room) && room !== socket.id) {
        roomList.push(room);
      }
    }

    socket.emit('room list', roomList);
  });

  socket.on('disconnect', () => {
    if (socket.room) {
      socket.leave(socket.room);
      io.to(socket.room).emit('user left', socket.id);
    }
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Servidor Socket.IO iniciado en el puerto ${port}`);
});
