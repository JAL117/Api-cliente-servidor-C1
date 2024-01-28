const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Usuario = require("./Usuario.model");

const Chat = sequelize.define(
  "Chat",
  {
    grupo: {
      type: DataTypes.STRING,
      onDelete:'CASCADE',
      onUpdate:'CASCADE',
      references:{
        model: Usuario,
        key: 'grupo'

      },
    },
    Contenido: {
      type: DataTypes.STRING,
    }

  },
  {
    timestamps: false,
  }
);

module.exports = Chat;
