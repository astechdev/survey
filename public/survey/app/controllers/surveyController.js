define(['app', 'services/surveyService', '../../../common/services/surveyUtilService'], function(app) {
    app.controller('surveyController', ['$scope', 'SurveyService', 'SurveyUtilService',
        function($scope, SurveyService, SurveyUtilService) {
            //initialize services
            SurveyUtilService.init(SurveyService.init);
            //Make services available to view
            $scope.SurveyService = SurveyService;
            $scope.SurveyUtilService = SurveyUtilService;
        }
    ])
});