myApp.factory('authInterceptor', function ($window) {
    return {
        request: function (config) {
            var token = $window.localStorage['jwtToken'];
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }
    };
});

myApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});
