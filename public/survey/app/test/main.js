var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

require.config({
    // !! Karma serves files from '/base'
    // (in this case, it is the root of the project /your-project/app/js)
    baseUrl: '/base',
    paths: {
        angular: 'vendor/angular.min',
        jquery: 'vendor/jquery-1.10.2.min',
        domReady: 'vendor/domReady',
        angularRoute: 'vendor/angular-route',
        angularResource: 'vendor/angular-resource.min',
    },
    // example of using shim, to load non-AMD libraries
    // (such as Backbone, jQuery)
    shim: {
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        angularRoute: {
            deps: ['angular']
        },
        angularResource: {
            deps: ['angular']
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});