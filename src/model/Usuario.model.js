const sequelize = require('../../db');
const { DataTypes } = require('sequelize');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombreDeUsuario: {
    type: DataTypes.STRING
  },
  contrasena: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false 
});

module.exports = Usuario;