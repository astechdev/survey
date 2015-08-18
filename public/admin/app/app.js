define(['angularAMD', 'angular-route', "angular-material"], function(angularAMD) {
    //Create surveyAdminApp
    var app = angular.module('surveyAdminApp', ['ngRoute', 'ngMaterial']);
    //Configure surveyAdminApp    
    app.config(function($routeProvider, $locationProvider, $mdThemingProvider) {
        //For pretty URLs
        $locationProvider.html5Mode(true);
        //Define routes, views, and controllers
        $routeProvider.when('/admin/', angularAMD.route({
            redirectTo: '/admin/results'
        })).when('/admin/:content', angularAMD.route({
            templateUrl: 'admin/app/views/admin.html',
            controller: 'adminController',
            controllerUrl: 'controllers/adminController'
        })).when('/login', angularAMD.route({
            templateUrl: 'admin/app/views/login.html',
            controller: 'loginController',
            controllerUrl: 'controllers/loginController'
        })).when('/404', angularAMD.route({
            templateUrl: 'admin/app/views/404.html'
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