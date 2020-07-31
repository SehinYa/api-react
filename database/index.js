const Sequelize = require('sequelize');


const sequelize = new Sequelize('resumeApp', 'postgres', 'Mypsswd1!', {
  host: "localhost",
  Port: "5432",
  dialect: "postgres",
  operatorAliases: false,
});

const db = {
  sequelize,
  Sequelize
};


module.exports = db;

  

  