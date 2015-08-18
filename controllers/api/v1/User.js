var userModel = new require('../../../models/mysql/User');

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
    },
    getSurveyModel: function(req, res) {
        userModel.getSurveyModel(function(response) {
            res.contentType('application/json');
            res.write(JSON.stringify(response));
            res.end();
        });
    },
    addQuestionToSurvey: function(req, res) {
        userModel.addQuestionToSurvey(req.body, function(response) {
            res.contentType('application/json');
            res.write(JSON.stringify(response));
            res.end();
        });
    }
};
module.exports = new User_Controller();