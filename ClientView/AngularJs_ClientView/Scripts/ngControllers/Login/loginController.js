myApp
    .controller('loginController', ['$scope', 'authService', '$window',
        function (
            $scope, authService, $window
        ) {

            $scope.login = function () {
                authService.userLogin(
                    $scope.username, $scope.password
                ).then(function (res) {
                    authService.saveToken(res.data.token);
                    $window.location.href = "/Home/Index";
                }).catch(function (error) {
                    // Handle errors gracefully
                    Swal.fire({
                        title: 'Error',
                        text: 'An error occurred while login. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#d33'
                    });
                });
            };
        }
    ])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });