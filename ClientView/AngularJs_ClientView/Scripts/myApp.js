var myApp = angular.module('myApp', ['ngRoute', 'ngFileUpload']);

// Global variables
myApp.constant('serviceBasePath', 'http://localhost:50454');
myApp.constant('applicationBasePath', 'http://localhost:50845');
myApp.constant('dataTableRows', '5');

// Interceptor Configuration
myApp.config(['$httpProvider', function ($httpProvider) {

    // Define the interceptor logic
    var authInterceptorFunc = ['$q', '$window', function ($q, $window) {
        return {
            request: function (config) {
                var token = $window.localStorage.getItem('jwtToken');
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    $window.location.href = "/Account/Login";
                }
                return $q.reject(rejection);
            }
        };
    }];

    // Push the function array directly. DO NOT push the string 'authInterceptor'.
    $httpProvider.interceptors.push(authInterceptorFunc);
}]);

// HTML5 Mode Configuration
myApp.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });
}]);