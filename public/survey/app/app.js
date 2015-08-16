define(['angularAMD', 'angular-route', "angular-material"], function(angularAMD) {
    //Create surveyApp
    var app = angular.module('surveyApp', ['ngRoute', 'ngMaterial']);
    //Configure surveyApp    
    app.config(function($routeProvider, $locationProvider, $mdThemingProvider) {
        //For pretty URLs
        $locationProvider.html5Mode(true);
        //Define routes, views, and controllers
        $routeProvider.when('/survey', angularAMD.route({
            templateUrl: 'survey/app/views/survey.html',
            controller: 'surveyController',
            controllerUrl: 'controllers/surveyController'
        })).when('/404', angularAMD.route({
            templateUrl: 'survey/app/views/404.html'
        })).when('/', angularAMD.route({
            redirectTo: '/survey'
        })).otherwise(angularAMD.route({
            redirectTo: '/404'
        }));
        //Define app palettes
        $mdThemingProvider.theme('default')
            .primaryPalette('red', {
            'default': '400', 
            'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
        })
            .accentPalette('grey', {
            'default': '200' // use shade 200 for default, and keep all other shades the same
        });
    });
    return angularAMD.bootstrap(app);
});