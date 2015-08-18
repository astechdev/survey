define(['app'], function(app) {
    app.factory('AuthenticationService', ['$http', '$location',
        function($http, $location) {
            function AuthenticationService() {
                this.email;
                this.password;
                this.requestedPath;
            };
            AuthenticationService.prototype = {
                constructor: AuthenticationService,
                init: function() {
                    //Do nothing for now...
                },
                login: function (successRoute){
                    $http.post('/api/v1/user/login', {email:authenticationService.email, password: authenticationService.password}).
                    success(function(data, status, headers, config) {
                        console.log($location.state());
                        // this callback will be called asynchronously
                        $location.path(successRoute);
                    }).
                    error(function(data, status, headers, config) {
                        $location.path('/login');
                    });
                },
                logout: function() {
                    $http.get('/api/v1/user/logout').
                    success(function(data, status, headers, config) {
                        $location.path('/login');
                    });
                },
            }
            var authenticationService = new AuthenticationService();
            return authenticationService;
        }
    ]);
});