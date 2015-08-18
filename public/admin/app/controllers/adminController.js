define(['app', 'services/adminService', 'services/authenticationService', '../../../common/services/surveyUtilService'], function(app) {
    app.controller('adminController', ['$scope', 'AdminService', 'AuthenticationService', 'SurveyUtilService',
        function($scope, AdminService, AuthenticationService, SurveyUtilService) {
            //initialize services
            AuthenticationService.init();
            SurveyUtilService.init(SurveyUtilService.generateAnswerStats);
            AdminService.init();
            //Make services available to view
            $scope.AdminService = AdminService;
            $scope.SurveyUtilService = SurveyUtilService;
            $scope.AuthenticationService = AuthenticationService;
        }
    ])
});