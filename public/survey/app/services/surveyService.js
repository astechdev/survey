define(['app', '../../../common/services/surveyUtilService'], function(app) {
    app.factory('SurveyService', ['$http', 'SurveyUtilService', '$routeParams', '$location', 'localStorageService',
        function($http, SurveyUtilService, $routeParams, $location, localStorageService) {
            function SurveyService() {
                this.displayContent = "";
                this.answeredSurveyModel = {};
                this.unansweredQuestions = [];
                this.questionId = undefined;
                this.answerId = undefined;
            };
            SurveyService.prototype = {
                constructor: SurveyService,
                init: function() {
                    surveyService.unansweredQuestions = [];
                    surveyService.answeredSurveyModel = localStorageService.get('answeredSurveyModel');
                    if(surveyService.answeredSurveyModel === null) {
                        answeredSurveyModel = {
                            questions: [],
                            answers: {}
                        };
                        surveyService.answeredSurveyModel = answeredSurveyModel;
                        localStorageService.set('answeredSurveyModel', answeredSurveyModel);
                    }
                    //Set Main Content View. If no question id specified then
                    //randomly select an unanswered one
                    if($routeParams.question === 'random') {
                        angular.forEach(SurveyUtilService.surveyModel.questions, function(question) {
                            var isAnswered = surveyService.answeredSurveyModel.questions.indexOf(String(question.id));
                            if(isAnswered < 0) {
                                surveyService.unansweredQuestions.push(question.id);
                            }
                        });
                        var randomQuestion = surveyService.unansweredQuestions[Math.floor(Math.random() * surveyService.unansweredQuestions.length)];
                        if(randomQuestion !== undefined) {
                            surveyService.displayContent = 'survey';
                            $location.path('/survey/' + randomQuestion);
                        } else {
                            surveyService.displayContent = 'complete';
                            $location.path('/survey/complete');
                        }
                    } else if($routeParams.question === 'complete') {
                        surveyService.displayContent = 'complete';
                    } else if($routeParams.question === 'error') {
                        surveyService.displayContent = 'error';
                    } else {
                        var isAnswered = surveyService.answeredSurveyModel.questions.indexOf(String($routeParams.question));
                        if(isAnswered < 0) {
                            var isAvailable = SurveyUtilService.surveyModel.questions.indexOf(String($routeParams.question));
                            var availableQuestionsIdArray = [];
                            angular.forEach(SurveyUtilService.surveyModel.questions, function(question) {
                                availableQuestionsIdArray.push(String(question.id));
                            });
                            var isAvailable = availableQuestionsIdArray.indexOf($routeParams.question);
                            if(isAvailable >= 0) {
                                surveyService.displayContent = 'survey';
                                surveyService.setQuestionId($routeParams.question);
                            } else {
                                surveyService.displayContent = 'unavailable';
                                $location.path('/survey/unavailable');
                            }
                        } else {
                            $location.path('/survey/complete');
                        }
                    }
                },
                setQuestionId: function(questionId) {
                    surveyService.questionId = questionId;
                },
                localStoreAnswer: function(status) {
                    if(status === 'complete') {
                        var answeredSurveyModel = localStorageService.get('answeredSurveyModel');
                        if(answeredSurveyModel === null) {
                            answeredSurveyModel = {
                                questions: [],
                                answers: {}
                            };
                            localStorageService.set('answeredSurveyModel', answeredSurveyModel);
                        }
                        answeredSurveyModel.questions.push(surveyService.questionId);
                        answeredSurveyModel.answers[surveyService.questionId] = surveyService.answerId;
                        localStorageService.set('answeredSurveyModel', answeredSurveyModel);
                        surveyService.answerId = undefined;
                        $location.path('/survey/random');
                    } else if(status === 'error') {
                        $location.path('/survey/error');
                    } else if(status === 'clear') {
                        localStorageService.set('answeredSurveyModel', {questions: [], answers: {} });
                        $location.path('/survey/random');
                    }
                }
            };
            var surveyService = new SurveyService();
            return surveyService;
        }
    ]);
});