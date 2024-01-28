const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Usuario = require("./Usuario.model");

const Tareas = sequelize.define(
  "Tareas",
  {
    grupo: {
      type: DataTypes.STRING,
      onDelete:'CASCADE',
      onUpdate:'CASCADE',
      references:{
        model: Usuario,
        key: 'grupo'

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
