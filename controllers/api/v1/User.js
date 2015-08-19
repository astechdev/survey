var userModel = require('../../../models/mysql/User');

function User_Controller() {}
User_Controller.prototype = {
    constructor: User_Controller,
    login: function(req, res) {
        res.contentType('application/json');
        res.write(JSON.stringify({}));
        res.end();
    },
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};
module.exports = new User_Controller();