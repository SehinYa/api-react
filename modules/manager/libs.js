const Manager = require('../../database/managers');
exports.createManager = function(username, password) {
   return Manager.create({
        username,
        password
    });
    };
