// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var UserModel = require('../models/mysql/User');

// expose this function to our app using module.exports
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });
    passport.deserializeUser(function(email, done) {
        UserModel.getUser(email, function(user) {
            // all is well, return successful user
            return done(null, user);
        });
    });
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { 
        // we are checking to see if the user trying to login already exists
        UserModel.getUser(email, function(user) {
            console.log('user: ' + JSON.stringify(user));
            console.log('email: ' + email);
            console.log('password: ' + password);
            return done(null, user);
        });
    }));
};