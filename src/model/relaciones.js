const Usuario= require("./Usuario.model");
const Tareas = require("./Tareas.model.js");

Usuario.hasMany(Tareas);
Tareas.belongsTo(Usuario);