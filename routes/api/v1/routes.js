var userController = require('../../../controllers/api/v1/User');
var surveyController = require('../../../controllers/api/v1/Survey');
var passport = require('passport');
module.exports = function(app) {
    //Application
    app.get('/', function(req, res) {
        res.render('survey/app/index.html');
    });
    app.get('/survey/:question', function(req, res) {
        res.render('survey/app/index.html');
    });
    app.get('/survey', function(req, res) {
        res.redirect('/survey/random');
    });
    app.get('/admin', function(req, res) {
        res.redirect('/admin/results');
    });
    app.get('/admin/:content', function(req, res) {
        if(req.isAuthenticated()) {
            res.render('admin/app/index.html');
        } else {
            res.redirect('/login');
        }
    });
    app.get('/login', function(req, res) {
        if(req.isAuthenticated()) {
            res.redirect('/admin');
        } else {
            res.render('admin/app/index.html');
        }
    });
    //Api
    app.post('/api/v1/user/login', passport.authenticate('local-login'), userController.login);
    app.get('/api/v1/user/logout', userController.logout);
    app.get('/api/v1/survey', surveyController.getSurveyModel);
    app.post('/api/v1/survey/question', isLoggedIn, surveyController.addQuestionToSurvey);
    app.post('/api/v1/survey/answer', surveyController.submitAnswer);
};

function isLoggedIn(req, res, next) {
    //if user is authenticated in the session, carry on 
    if(req.isAuthenticated()) return next();
    //Could determine reason for failure here and
    //then send approptiate error code...send 400
    //for now
    res.send(400);
}