define(['app', 'services/authenticationService'], function(app) {
    app.factory('SurveyUtilService', ['$http', '$location', '$filter', 'AuthenticationService',
        function($http, $location, $filter, AuthenticationService) {
            function SurveyUtilService() {
                this.surveyModel = {};
                this.results = {};
                this.newQuestion = "";
                this.numberOfNewQuestionAvailableAnswers = 2;
                //Multiple choice questions so we should have at least 2 options
                this.newQuestionAvailableAnswers = new Array(this.numberOfNewQuestionAvailableAnswers);
                this.mainContentDisplay = 'results';
            };
            SurveyUtilService.prototype = {
                constructor: SurveyUtilService,
                init: function(model) {
                    $http.get('/api/v1/survey').
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        model = data;
                    }).
                    error(function(data, status, headers, config) {
//                         AuthenticationService.requestedPath = $location.path();
                        $location.path('/login');
                    });
                },
                getAvailableAnswers: function(question, availableAnswers, answers){
                    var availableAnswers = $filter('filter')(availableAnswers, {question_id: question.id});
                    angular.forEach(availableAnswers, function(availableAnswer) {
                        var totalNumberAnswers = $filter('filter')(answers,
                                                                   {question_id: question.id}).length;
                        var answerOccurrence = $filter('filter')(answers,
                                                        {available_answer_id: availableAnswer.id, question_id: question.id}).length;
                        adminService.results[availableAnswer.id] = (answerOccurrence > 0) ? ((answerOccurrence/totalNumberAnswers)*100) : 0;
                    });
                    return availableAnswers;
                },
                addQuestionToSurvey: function(callback){
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
                        callback('complete')
                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        callback('error')
                    });
                }
            };
            var surveyUtilService = new SurveyUtilService();
            return surveyUtilService;
        }
    ]);
});