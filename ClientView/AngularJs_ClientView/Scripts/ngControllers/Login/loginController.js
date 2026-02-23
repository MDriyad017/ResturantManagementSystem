myApp
    .controller('loginController', ['$scope', 'authService', '$window', 'applicationBasePath', 'authInterceptor', 
        function (
            $scope, authService, $window, applicationBasePath, authInterceptor
        ) {

            $scope.login = function () {
                authService.userLogin(
                    $scope.username, $scope.password
                )
                .then(function (res) {
                    if (res.data.success === true) {
                        authService.saveToken(res.data.token);

                        Swal.fire({
                            title: 'Success!',
                            text: 'Welcome back, ' + $scope.username,
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.replace("/Home/Index");
                        });
                    } else {
                        $scope.showLoginError(res.data.message || 'Login Failed');
                    }
                })
                .catch(function (error) {
                    var errorMsg = (error.data && error.data.message) ? error.data.message : 'Invalid Username or Password';
                    $scope.showLoginError(errorMsg);
                });
            };

            $scope.showLoginError = function (msg) {
                Swal.fire({
                    title: 'Login Failed',
                    text: msg,
                    icon: 'error',
                    confirmButtonColor: '#764ba2',
                    showClass: { popup: 'animate__animated animate__shakeX' }
                });
            };

            $scope.openRegisterPage = function () {
                window.location.replace("/Account/Register");
            }
        }
    ])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });