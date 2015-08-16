define(['app', 'services/surveyService'], function(app) {
    app.controller('surveyController', ['$scope', 'SurveyService',
        function($scope, SurveyService) {
            SurveyService.init();
            $scope.SurveyService = SurveyService;
        }
    ])
});