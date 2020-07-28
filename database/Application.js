const db = require('./index');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;



const {Model, DataTypes} = require('sequelize');

class Application extends Model {}

Application.init(
  {
  first_name: {
    type:DataTypes .STRING,
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
    modelName: "Application",
    tableName: 'applications',
    timestamps: false
  }
  ),

  Application.sync().then(() => {
    console.log("table created")
  })

module.exports = Application;