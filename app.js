const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Usuario = require('./src/routes/Usuario.route');
const Tareas = require("./src/routes/Tareas.routes")

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}


app.use(corsMiddleware);
app.use("/tareas",Tareas)
app.use("/usuario", Usuario);




module.exports = app;