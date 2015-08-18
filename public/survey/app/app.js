define(['angularAMD', 'angular-local-storage', 'angular-route', "angular-material"], function(angularAMD) {
    //Create surveyApp
    var app = angular.module('surveyApp', ['ngRoute', 'ngMaterial', 'LocalStorageModule']);
    //Configure surveyApp    
    app.config(function($routeProvider, $locationProvider, $mdThemingProvider, localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('appsumo');
        //For pretty URLs
        $locationProvider.html5Mode(true);
        //Define routes, views, and controllers
        $routeProvider.when('/survey/:question', angularAMD.route({
            templateUrl: 'survey/app/views/survey.html',
            controller: 'surveyController',
            controllerUrl: 'controllers/surveyController'
        })).when('/404', angularAMD.route({
            templateUrl: 'survey/app/views/404.html'
        })).when('/', angularAMD.route({
            templateUrl: 'survey/app/views/welcome.html',
            controller: 'welcomeController',
            controllerUrl: 'controllers/welcomeController'
        })).otherwise(angularAMD.route({
            redirectTo: '/404'
        }));
        //Define app palettes
        $mdThemingProvider.theme('default')
            .primaryPalette('red', {
            'default': '400', 
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': 'A100'
        }).accentPalette('grey', {
            'default': '200'
        });
    });
    return angularAMD.bootstrap(app);
});