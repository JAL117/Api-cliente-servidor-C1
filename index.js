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


});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});