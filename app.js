const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Usuario = require('./src/routes/Usuario.route');


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/usuario", Usuario);

app.get('/', (req, res) => {
  res.json("server initialized");
});

module.exports = app;