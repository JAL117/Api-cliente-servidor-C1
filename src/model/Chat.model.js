const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const Usuario = require("./Usuario.model")

const Chat = sequelize.define('Chat', {
  id_usuario: {
    type: DataTypes.INTEGER,
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
    references:{
      model: Usuario,
      key:'id_usuario'
    }
  },
  Contenido: {
    type: DataTypes.STRING
  },
  Emisor: {
    type: DataTypes.STRING
  },
  Destinatario: {
    type: DataTypes.STRING
  },
  Fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },Grupo:{
    type : DataTypes.STRING

  }
}, {
  timestamps: false
});

module.exports = Chat;