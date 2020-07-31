const Application = require('../../database/Application');
exports.createApplication = function(first_name, last_name, email, position) {
   return Application.create({
        first_name,
        last_name,
        email,
        position
    });
    };
