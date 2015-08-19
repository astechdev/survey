define(['app'], function(app) {
    app.controller('welcomeController', ['$scope', '$window',
        function($scope, $window) {
            $scope.takeSurvey = function() {
                $window.location.href = $window.location.protocol + '//' + $window.location.host + '/survey';
            }
            $scope.administer = function() {
                $window.location.href = $window.location.protocol + '//' + $window.location.host + '/admin';
            }
        }
    ])
});