/**
 *  Define the User model.
 */
var bcrypt = require('bcrypt-nodejs');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.dbName, process.env.username, process.env.password, {
    port: process.env.port,
    dialect: "mysql"
});
var Users = sequelize.define('appsumo_users', {
    email: Sequelize.STRING,
    password: Sequelize.STRING
});
Users.sync().then(function () {
  // Table created, seed it with an admin user
  return Users.create({
    email: 'admin@appsumo.com',
    password: userModel.generateHash('Un1corn')
  });
});;
var Questions = sequelize.define('questions', {
    question: Sequelize.STRING
});
Questions.sync();
var AvailableAnswers = sequelize.define('available_answers', {
    question_id: Sequelize.INTEGER,
    available_answer: Sequelize.STRING
});
AvailableAnswers.sync();
var Answers = sequelize.define('answers', {
    question_id: Sequelize.INTEGER,
    available_answer_id: Sequelize.INTEGER
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

function User_Model() {}
User_Model.prototype = {
    constructor: User_Model,
    getSurveyModel: function(callback) {
        Questions.findAll().then(function(questionsResponse) {
            AvailableAnswers.findAll().then(function(availableAnswersResponse) {
                Answers.findAll().then(function(answersResponse) {
                    var surveyModel = new SurveyModel(questionsResponse, availableAnswersResponse, answersResponse);
                    callback(surveyModel);
                });
            });
        });
    },
    getUser: function(email, callback) {
        Users.findOne({
            where: {
                "email": email
            }
        }).then(function(user) {
            callback(user);
        })
    },
    addQuestionToSurvey: function(QuestionModel, callback) {
        Questions.create({
            question: QuestionModel.question
        }).then(function(question) {
            console.log("question: " + JSON.stringify(question));
            for (var i = 0; i < QuestionModel.availableAnswers.length; i++) {
                console.log("availableAnswer: " + JSON.stringify(QuestionModel.availableAnswers[i]));
                AvailableAnswers.create({
                    question_id: question.id,
                    available_answer: QuestionModel.availableAnswers[i]
                });
            }
        }).then(function() {
            callback({});
        });
    },
    generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
    }
};
var userModel = new User_Model();
module.exports = userModel;