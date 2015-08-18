require.config({
    waitSeconds: 200,
    paths: {
        "jquery": "../../bower_components/jquery/dist/jquery",
        "jquery-ui": "../../bower_components/jqueryui/jquery-ui.min",
        "angular": "../../bower_components/angular/angular.min",
        "angularAMD": "../../bower_components/angularAMD/angularAMD",
        "angular-material": "../../bower_components/angular-material/angular-material",
        "angular-animate": "../../bower_components/angular-animate/angular-animate",
        "angular-aria": "../../bower_components/angular-aria/angular-aria",
        "angular-route": "../../bower_components/angular-route/angular-route",
        "angular-local-storage": "../../bower_components/angular-local-storage/dist/angular-local-storage",
        "survey-controller": "controllers/surveyController",
        "survey-service": "services/surveyService",
        "survey-util-service": "../../common/services/surveyUtilService"
    },
    shim: {
        //jQuery Plugins
        "jquery-ui": ["jquery"],
        //Angular and any third party angular modules
        "angularAMD": ["angular"],
        "angular-route": ["angular"],
        "angular-material": ["angular", "angular-animate", "angular-aria"],
        "angular-animate": ["angular"],
        "angular-aria": ["angular"],
        "angular-local-storage": ["angular"]
    },
    deps: ["app"]
});