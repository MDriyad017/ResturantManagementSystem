myApp
    .factory('authService', ['$http', '$window', 'serviceBasePath', 
        function ($http, $window, serviceBasePath) {
            var fac = {};

            fac.userLogin = function (
                userName, password
            ) {
                return $http({
                    method: 'POST',
                    url: serviceBasePath + '/api/login001',
                    dataType: 'json',
                    data: JSON.stringify({
                        "UserName": userName,
                        "Password": password
                    }),
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            };

            fac.saveToken = function (token) {
                $window.localStorage.setItem('jwtToken', token);
            };

            fac.getToken = function () {
                return $window.localStorage.getItem('jwtToken');
            };

            fac.logout = function () {
                $window.localStorage.removeItem('jwtToken');
            };

            return fac;
        }
    ])