const { Sequelize } = require("sequelize");
require("dotenv").config();

const {NAMEDB , USERDB , PASS} = process.env;


const sequelize = new Sequelize(NAMEDB,USERDB,PASS, {
  host: "localhost",
  dialect: "mysql",
});


module.exports = sequelize;

