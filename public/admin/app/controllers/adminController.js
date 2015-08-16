define(['app', 'services/adminService', 'services/authenticationService'], function(app) {
    app.controller('adminController', ['$scope', 'AdminService', 'AuthenticationService',
        function($scope, AdminService, AuthenticationService) {
            $scope.AuthenticationService = AuthenticationService;
            AdminService.init();
            $scope.AdminService = AdminService;
        }
    ])
});