/**
 *  Define the User model.
 */
var mysql = require("./Model");
var bcrypt = require('bcrypt-nodejs');
function SurveyModel(questions, availableAnswers, answers) {
    this.questions = questions;
    this.availableAnswers = availableAnswers;
    this.answers = answers;
//     this.model = {};
}
SurveyModel.prototype = {
    constructor: SurveyModel,
    init: function() {
//         this.model = ...;
    }
};
function User_Model() {}
User_Model.prototype = {
    constructor: User_Model,
    getSurveyModel: function(callback) {
        mysql.query("SELECT * FROM questions", function(questionsResponse) {
            mysql.query("SELECT * FROM available_answers", function(availableAnswersResponse) {
                mysql.query("SELECT * FROM answers", function(answersResponse) {
                    var surveyModel = new SurveyModel(questionsResponse, availableAnswersResponse, answersResponse);
                    surveyModel.init();
                    callback(surveyModel);
                });
            });
        });
    },
    getUser: function(email, callback) {
        this.UsersQuery = "SELECT * FROM users WHERE email = '" + email + "'";
        mysql.query(this.UsersQuery, callback);
    },
    generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
    }
};
module.exports = new User_Model();