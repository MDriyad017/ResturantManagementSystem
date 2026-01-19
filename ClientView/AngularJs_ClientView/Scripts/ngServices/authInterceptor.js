myApp.factory('authInterceptor', ['$q', '$window', '$location', function ($q, $window, $location) {
    return {
        // This will run before every HTTP request
        request: function (config) {
            config.headers = config.headers || {};
            var token = $window.localStorage.getItem('jwtToken');
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        },
        // This will run if the server returns an error (like 401 Unauthorized)
        responseError: function (rejection) {
            if (rejection.status === 401) {
                // If unauthorized, redirect to login
                $window.location.href = "/Account/Login";
            }
            return $q.reject(rejection);
        }
    };
}]);