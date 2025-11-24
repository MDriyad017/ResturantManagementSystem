var myApp = angular.module('myApp', ['ngRoute', 'ngFileUpload']);

//var myApp = angular.module('myApp', ['ngRoute', 'ngFileUpload'])
//    //.config(['$locationProvider', function ($locationProvider) {
//    //    $locationProvider.html5Mode({
//    //        enabled: true,
//    //        requireBase: false // Disable base tag requirement
//    //    });
//    //}]);

// global variables
myApp.constant('serviceBasePath', 'http://localhost:50454');
myApp.constant('applicationBasePath', 'http://localhost:50845');
myApp.constant('dataTableRows', '5');

