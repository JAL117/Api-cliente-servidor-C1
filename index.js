const { Server: SocketServer } = require('socket.io');
const http = require('http');
const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on('connection', (socket) => {
  socket.on('usuarioConectado', (grupo) => {
    socket.join(grupo); 
    console.log("Se ha unido al grupo", grupo);
  });

  socket.on("mensaje", (data) => {
    io.to(data.room).emit('mensaje', data);
    console.log(data);
  });
});

server.listen(port, () => {
  console.log(`Servidor Socket.IO iniciado en el puerto ${port}`);
});
