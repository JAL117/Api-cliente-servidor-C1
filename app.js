const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Usuario = require('./src/routes/Usuario.route');
const Chat = require("./src/routes/Chat.routes")
const Tareas = require("./src/routes/Tareas.routes")

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/tareas",Tareas)
app.use("/usuario", Usuario);
app.use("/chat" , Chat);



module.exports = app;