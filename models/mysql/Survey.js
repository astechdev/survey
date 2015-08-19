var model = require('./Model');
var Questions = model.sequelize.define('questions', {
    question: model.Sequelize.STRING
});
Questions.sync();
var AvailableAnswers = model.sequelize.define('available_answers', {
    question_id: model.Sequelize.INTEGER,
    available_answer: model.Sequelize.STRING
});
AvailableAnswers.sync();
var Answers = model.sequelize.define('answers', {
    question_id: model.Sequelize.INTEGER,
    available_answer_id: model.Sequelize.INTEGER
});
Answers.sync();

function SurveyModel(questions, availableAnswers, answers) {
    this.questions = questions;
    this.availableAnswers = availableAnswers;
    this.answers = answers;
}
SurveyModel.prototype = {
    constructor: SurveyModel
};

function Survey_Model() {}
Survey_Model.prototype = {
    constructor: Survey_Model,
    getSurveyModel: function(callback) {
        Questions.findAll().then(function(questionsResponse) {
            AvailableAnswers.findAll().then(function(availableAnswersResponse) {
                Answers.findAll().then(function(answersResponse) {
                    callback(new SurveyModel(questionsResponse, availableAnswersResponse, answersResponse));
                });
            });
        });
    },
    addQuestionToSurvey: function(QuestionModel, callback) {
        Questions.create({
            question: QuestionModel.question
        }).then(function(question) {
            for(var i = 0; i < QuestionModel.availableAnswers.length; i++) {
                AvailableAnswers.create({
                    question_id: question.id,
                    available_answer: QuestionModel.availableAnswers[i]
                });
            }
        }).then(function() {
            callback({});
        });
    },
    submitAnswer: function(AnswerModel, callback) {
        Answers.create({
            question_id: AnswerModel.question_id,
            available_answer_id: AnswerModel.available_answer_id
        }).then(function() {
            callback({});
        });
    }
};
var surveyModel = new Survey_Model();
module.exports = surveyModel;