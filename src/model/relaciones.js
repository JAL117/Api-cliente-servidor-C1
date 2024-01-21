const Usuario= require("./Usuario.model");
const Tareas = require("./Tareas.model.js");
const Chat = require('./Chat.model')

Usuario.hasMany(Tareas);
Tareas.belongsTo(Usuario);

Usuario.hasMany(Chat);
Chat.belongsTo(Usuario);
