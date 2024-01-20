const sequelize = require('../../db');
const { DataTypes } = require('sequelize');

const Chat = sequelize.define('Chat', {
  id_chat: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  Contenido: {
    type: DataTypes.STRING
  },
  Emisor: {
    type: DataTypes.STRING
  },
  Destinatario:{
    type: DataTypes.STRING
  },
  Fecha:{
    type:DataTypes.DATE, defaultValue:Date.now
  }
}, {
  timestamps: false 
});

module.exports = Chat;