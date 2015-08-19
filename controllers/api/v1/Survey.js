var surveyModel = require('../../../models/mysql/Survey');

function Survey_Controller() {}
Survey_Controller.prototype = {
    constructor: Survey_Controller,
    getSurveyModel: function(req, res) {
        surveyModel.getSurveyModel(function(response) {
            res.contentType('application/json');
            res.write(JSON.stringify(response));
            res.end();
        });
    },
    addQuestionToSurvey: function(req, res) {
        surveyModel.addQuestionToSurvey(req.body, function(response) {
            res.contentType('application/json');
            res.write(JSON.stringify(response));
            res.end();
        });
    },
    submitAnswer: function(req, res) {
        surveyModel.submitAnswer(req.body, function(response) {
            res.contentType('application/json');
            res.write(JSON.stringify(response));
            res.end();
        });
    }
};
module.exports = new Survey_Controller();