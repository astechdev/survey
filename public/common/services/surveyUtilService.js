define(['app'], function(app) {
    app.factory('SurveyUtilService', ['$http', '$filter',
        function($http, $filter) {
            function SurveyUtilService() {
                this.surveyModel = {};
                this.results = {};
            };
            SurveyUtilService.prototype = {
                constructor: SurveyUtilService,
                init: function(callback) {
                    //Fetch data and generate statistics
                    surveyUtilService.refreshData(callback);
                },
                refreshData: function(successCallback, failureCallback) {
                    $http.get('/api/v1/survey').
                    success(function(data, status, headers, config) {
                        surveyUtilService.surveyModel = data;
                        if(successCallback !== 'undefined') {
                            successCallback(data);
                        }
                    }).
                    error(function(data, status, headers, config) {
                        if(failureCallback !== 'undefined') {
                            failureCallback(data, status, headers, config);
                        }
                    });
                },
                getAvailableAnswers: function(questionId) {
                    return $filter('filter')(surveyUtilService.surveyModel.availableAnswers, {
                        question_id: questionId
                    });
                },
                generateAnswerStats: function(data) {
                    angular.forEach(data.questions, function(question) {
                        var availableAnswers = $filter('filter')(data.availableAnswers, {
                            question_id: question.id
                        });
                        angular.forEach(availableAnswers, function(availableAnswer) {
                            var totalNumberAnswers = $filter('filter')(data.answers, {
                                question_id: question.id
                            }).length;
                            var answerOccurrence = $filter('filter')(data.answers, {
                                available_answer_id: availableAnswer.id,
                                question_id: question.id
                            }).length;
                            surveyUtilService.results[availableAnswer.id] = (answerOccurrence > 0) ? ((answerOccurrence / totalNumberAnswers) * 100) : 0;
                        });
                    });
                },
                addQuestionToSurvey: function(newQuestion, newQuestionAvailableAnswers, successCallback, failureCallback) {
                    function QuestionModel(question, availableAnswers) {
                        this.question = question;
                        this.availableAnswers = availableAnswers;
                    }
                    QuestionModel.prototype = {
                        constructor: QuestionModel
                    };
                    $http.post('/api/v1/survey/question', JSON.stringify(new QuestionModel(newQuestion, newQuestionAvailableAnswers))).
                    success(function(data, status, headers, config) {
                        //update model and results
                        surveyUtilService.refreshData(surveyUtilService.generateAnswerStats);
                        if(successCallback !== 'undefined') {
                            successCallback('complete');
                        }
                    }).
                    error(function(data, status, headers, config) {
                        if(failureCallback !== 'undefined') {
                            failureCallback('error');
                        }
                    });
                },
                addAnswerToSurvey: function(questionId, answerId, successCallback, failureCallback) {
                    $http.post('/api/v1/survey/answer', JSON.stringify({
                        question_id: questionId,
                        available_answer_id: answerId
                    })).
                    success(function(data, status, headers, config) {
                        if(successCallback !== 'undefined') {
                            successCallback('complete');
                        }
                    }).
                    error(function(data, status, headers, config) {
                        if(failureCallback !== 'undefined') {
                            failureCallback('error');
                        }
                    });
                }
            };
            var surveyUtilService = new SurveyUtilService();
            return surveyUtilService;
        }
    ]);
});