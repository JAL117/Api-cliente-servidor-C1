const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Usuario = require("./Usuario.model");

const Tareas = sequelize.define(
  "Tareas",
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
    Titulo: {
      type: DataTypes.STRING,
    },
    Fecha: {
      type: DataTypes.DATEONLY,
    },
    Grado: {
      type: DataTypes.STRING,
    },
    Contenido: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Tareas;
