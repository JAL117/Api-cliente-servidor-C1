const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Usuario = require("./Usuario.model");

const Chat = sequelize.define(
  "Chat",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      onDelete:'CASCADE',
      onUpdate:'CASCADE',
      references:{
        model: Usuario,
        key: 'id_usuario'
      }
    },
    Contenido: {
      type: DataTypes.STRING,
    },
    Room:{
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
  }
);

module.exports = Chat;
