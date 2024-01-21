const app = require("./app");
require("dotenv").config();
const http = require('http');
const { Server: SocketServer } = require('socket.io');

const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

 
  socket.on('mensaje', (data) => {
    // Aquí puedes realizar las operaciones necesarias para guardar el mensaje en la base de datos
    console.log('Mensaje recibido:', data);
    // Emitir el mensaje a todos los clientes conectados
    io.emit('mensaje', data);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});