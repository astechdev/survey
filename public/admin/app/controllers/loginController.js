define(['app', '../../../common/services/authenticationService'], function(app) {
    app.controller('loginController', ['$scope', 'AuthenticationService',
        function($scope, AuthenticationService) {
            $scope.AuthenticationService = AuthenticationService;
        }
    ])
});