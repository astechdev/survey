define(['app'], function(app) {
    app.factory('SurveyService', ['$http',
        function($http) {
            function SurveyService() {
                this.user = {};
            };
            SurveyService.prototype = {
                constructor: SurveyService,
                init: function() {
                }
            };
            var surveyService = new SurveyService();
            return surveyService;
        }
    ]);
});