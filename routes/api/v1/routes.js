var userController = require('../../../controllers/api/v1/User');
var passport = require('passport');
module.exports = function(app) {
    //Application
    app.get('/', function(req, res) {
        res.render('survey/app/index.html');
    });
    app.get('/admin', function(req, res) {
        res.render('admin/app/index.html');
    });
    app.get('/login', function(req, res) {
        res.redirect('/admin');
    });
    // User
    app.post('/api/v1/user/login', passport.authenticate('local-login'), userController.login);
    app.get('/api/v1/user/logout', userController.logout);
    app.get('/api/v1/survey', isLoggedIn, userController.getSurveyModel);
};

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if(req.isAuthenticated()) return next();
    //Could test for failure and send approptiate error code
    res.send(401);
}