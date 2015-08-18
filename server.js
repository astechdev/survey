//Database configuration
process.env.dbName = 'pitchpredict';
process.env.username = 'adminHDr7Y4a';
process.env.password = '68UYVLhK8Cgt';
process.env.port = 3306;

var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require('path');
var passport = require('passport');
var AppSumoSurvey = function() {
    var self = this;
    self.app = express();
    self.setEnvironmentVariables = function() {
        //  Set the environment variables we need
        self.ipaddress = '';
        self.port = 3000;
        if(typeof self.ipaddress === "undefined") {
            self.ipaddress = "127.0.0.1";
        }
        //The following needs to happen after we assign env vars
        var configPassport = require('./config/passport')(passport); // pass passport for configuration
    };
    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        //Nothing to cache...
    };
    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) {
        return self.zcache[key];
    };
    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig) {
        if(typeof sig === "string") {
            console.log('%s: Received %s - terminating sample app ...', Date(Date.now()), sig);
            process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()));
    };
    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function() {
        //  Process on exit and signals.
        process.on('exit', function() {
            self.terminator();
        });
        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'].forEach(function(element, index, array) {
            process.on(element, function() {
                self.terminator(element);
            });
        });
    };
    /**
     *  Middle Ware.
     */
    self.middleware = function() {
        var app = self.app;
        app.set('views', path.join(__dirname, 'public'));
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'ejs');
        app.use(express.favicon());
        app.use(express.json({limit: '50mb'}));
        app.use(express.urlencoded({limit: '50mb'}));
        app.use(express.logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.methodOverride());
        app.use(express.cookieParser('haggard'));
        app.use(express.session({secret: 'haggard'})); 
        app.use(passport.initialize());
        app.use(passport.session()); // persistent login sessions
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));
        // Handle 404
        app.use(function(req, res) {
            res.status(400);
            res.render('survey/app/index.html');
        });
        // Handle 500
        app.use(function(error, req, res, next) {
            res.status(500);
            res.render('survey/app/views/500.html');
        });
    };
    self.routes = function() {
        require('./routes/api/v1/routes.js')(self.app);
    };
    /*
     *   Initialize Server
     */
    self.initialize = function() {
        self.setEnvironmentVariables();
        self.middleware();
        self.populateCache();
        self.setupTerminationHandlers();
        self.routes();
    };
    /*
     *   Start Server
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        http.createServer(self.app).listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddress, self.port);
        });
    };
};
/**
 *  main():  Main code.
 */
var app = new AppSumoSurvey();
app.initialize();
app.start();