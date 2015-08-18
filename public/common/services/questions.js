define(['app', 'services/authenticationService'], function(app) {
    app.factory('AdminService', ['$http', '$location', '$filter', 'AuthenticationService',
        function($http, $location, $filter, AuthenticationService) {
            function AdminService() {
                this.surveyModel = {};
                this.results = {};
                this.newQuestion = "";
                this.numberOfNewQuestionAvailableAnswers = 2;
                //Multiple choice questions so we should have at least 2 options
                this.newQuestionAvailableAnswers = new Array(this.numberOfNewQuestionAvailableAnswers);
                this.mainContentDisplay = 'results';
            };
            AdminService.prototype = {
                constructor: AdminService,
                init: function() {
                    $http.get('/api/v1/survey').
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        adminService.surveyModel = data;
                    }).
                    error(function(data, status, headers, config) {
                        AuthenticationService.requestedPath = $location.path();
                        $location.path('/login');
                    });
                },
                initNewQuestion: function() {
                    adminService.newQuestion = "";
                    adminService.numberOfNewQuestionAvailableAnswers = 2;
                    //Multiple choice questions so we should have at least 2 options
                    adminService.newQuestionAvailableAnswers = new Array(adminService.numberOfNewQuestionAvailableAnswers);
                },
                setMainContentDisplay: function(content){
                    adminService.mainContentDisplay = content;
                },
                getAvailableAnswers: function(question){
                    var availableAnswers = $filter('filter')(adminService.surveyModel.availableAnswers, {question_id: question.id});
                    angular.forEach(availableAnswers, function(availableAnswer) {
                        var totalNumberAnswers = $filter('filter')(adminService.surveyModel.answers,
                                                                   {question_id: question.id}).length;
                        var answerOccurrence = $filter('filter')(adminService.surveyModel.answers,
                                                        {available_answer_id: availableAnswer.id, question_id: question.id}).length;
                        adminService.results[availableAnswer.id] = (answerOccurrence > 0) ? ((answerOccurrence/totalNumberAnswers)*100) : 0;
                    });
                    return availableAnswers;
                },
                addQuestionToSurvey: function(){
                    function QuestionModel(question, availableAnswers) {
                        this.question = question;
                        this.availableAnswers = availableAnswers;
                    }
                    QuestionModel.prototype = {
                        constructor: QuestionModel
                    };
                    
                    $http.post('/api/v1/survey/question',JSON.stringify(new QuestionModel(adminService.newQuestion, adminService.newQuestionAvailableAnswers))).
                    success(function(data, status, headers, config) {
                        // called asynchronously on success
                        adminService.setMainContentDisplay('complete')
                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        adminService.setMainContentDisplay('error')
                    });
                }
            };
            var adminService = new AdminService();
            return adminService;
        }
    ]);
});