define(['app', 'services/authenticationService'], function(app) {
    app.factory('AdminService', ['$http', '$location', 'AuthenticationService',
        function($http, $location, AuthenticationService) {
            function AdminService() {
                this.user = {};
            };
            AdminService.prototype = {
                constructor: AdminService,
                init: function() {
                    $http.get('/api/v1/survey').
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                    }).
                    error(function(data, status, headers, config) {
                        AuthenticationService.requestedPath = $location.path();
                        $location.path('/login');
                    });
                }
            };
            var adminService = new AdminService();
            return adminService;
        }
    ]);
});