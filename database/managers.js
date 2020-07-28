const db = require('./index');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const bcrypt = require('bcryptjs');
const connInfo = require('../database/managers');

var connectionStr = 'postgres://postgres:Mypsswd1!@localhost:5432/Resumeapp';
var connectionStrLive = connInfo;
const managerSequelize = new Sequelize(connectionStr);

const Manager = managerSequelize.define('manager', {

  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },  
},

  {
      hooks: {
        beforeCreate: (manager) => {
          const salt = bcrypt.genSaltSync();
          manager.password = bcrypt.hashSync(manager.password, salt);
          }
      }
  });
  
  Manager.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }
 
  managerSequelize.sync().then( () => console.log('Db Connection OK, User Table Ready')).catch( err => console.log("DB Err: ", err));
  


module.exports = Manager;