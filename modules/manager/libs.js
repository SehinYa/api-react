const Manager = require('../../database/Manager');
exports.createManager = function(username, password) {
   return Manager.create({
        username,
        password
    });
    };
