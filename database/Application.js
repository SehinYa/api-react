const db = require('./index');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;



const {Model, DataTypes} = require('sequelize');

class Application extends Model {}

Application.init(
  {
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  position: {
    type: DataTypes.STRING,
  }, 
},
  {
    sequelize,
    modelName: "applications",
    tableName: 'applications',
    timestamps: false
  }
  );

  /*Application.create({
    first_name: 'sarah',
    last_name: 'dave',
    email: 'nate@yahoo.com',
    position: 'tester'
  });*/



module.exports = Application;