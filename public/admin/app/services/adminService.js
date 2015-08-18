define(['app'], function(app) {
    app.factory('AdminService', ['$location', '$mdSidenav', '$mdUtil', '$window', '$routeParams',
        function($location, $mdSidenav, $mdUtil, $window, $routeParams) {
            function AdminService() {
                this.mainContentDisplay = "";
                this.newQuestion = "";
                //Multiple choice questions so we should have at least 2 options
                this.numberOfNewQuestionAvailableAnswers = 2;
                this.newQuestionAvailableAnswers = new Array(this.numberOfNewQuestionAvailableAnswers);
            };
            AdminService.prototype = {
                constructor: AdminService,
                init: function() {
                    //Set Main Content View
                    adminService.setMainContentDisplay($routeParams.content);
                },
                initNewQuestion: function() {
                    adminService.newQuestion = "";
                    //Multiple choice questions so we should have at least 2 options
                    adminService.numberOfNewQuestionAvailableAnswers = 2;
                    adminService.newQuestionAvailableAnswers = new Array(adminService.numberOfNewQuestionAvailableAnswers);
                },
                setMainContentDisplay: function(content){
                    adminService.mainContentDisplay = content;
                },
                updatePath: function(content){
                    $location.path(content);
                },
                expandNewQuestionAvailableAnswersArray: function(){
                    adminService.newQuestionAvailableAnswers.push("");
                },
                reduceNewQuestionAvailableAnswersArray: function(){
                    if(adminService.newQuestionAvailableAnswers.length > 2){
                        adminService.newQuestionAvailableAnswers.pop();
                    }
                },
                toggleLeft: function() {
                    $mdSidenav('left').toggle();
                },
                takeSurvey: function(){
                    //We need a full page load                 
                    $window.location.href = $window.location.protocol + '//' + $window.location.host + '/survey';
                }
            };
            var adminService = new AdminService();
            return adminService;
        }
    ]);
});