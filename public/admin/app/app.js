define(['angularAMD', 'angular-route', "angular-material"], function(angularAMD) {
    //Create surveyAdminApp
    var app = angular.module('surveyAdminApp', ['ngRoute', 'ngMaterial']);
    //Configure surveyAdminApp    
    app.config(function($routeProvider, $locationProvider, $mdThemingProvider) {
        //For pretty URLs
        $locationProvider.html5Mode(true);
        //Define routes, views, and controllers
        $routeProvider.when('/admin', angularAMD.route({
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