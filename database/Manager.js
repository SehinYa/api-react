const db = require('./index');
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const bcrypt = require('bcryptjs');
const connInfo = require('../database/Manager');

var connectionStr = 'postgres://postgres:Mypsswd1!@localhost:5432/resumeApp';
var connectionStrLive = connInfo;
const managerSequelize = new Sequelize(connectionStr);

const {Model, DataTypes} = require('sequelize');

class Manager extends Model {}

Manager.init(
  {
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },  
},
  {
    sequelize,
    modelName: "manager",
    tableName: 'manager',
    timestamps: false
  }
  ), {
    hooks: {
      beforeCreate: (manager) => {
        bcrypt.genSalt(10, function(err,salt) {
          HTMLFormControlsCollection.log(salt);
          bcrypt.hash(req.body.password, salt, function(err, hash) {

            console.log(hash);
            const newManager ={
              username: req.body.username,
              password: hash
            };
          })
        })
      }
    }
  };
  
  Manager.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }
  
  managerSequelize.sync().then( () => console.log('Db Connection OK, User Table Ready')).catch( err => console.log("DB Err: ", err));
  
  



module.exports = Manager;