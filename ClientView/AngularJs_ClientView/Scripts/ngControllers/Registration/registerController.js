myApp
    .controller('registerController', ['$scope', 'authService', '$window', 'applicationBasePath', 'authInterceptor', 
        function (
            $scope, authService, $window, applicationBasePath, authInterceptor
        ) {

            $scope.registerUser = function () {
                authService.userRegistration(
                    $scope.fullname, $scope.userName, $scope.password, $scope.confirmPassword
                ).then(function (response) {
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Account Created!',
                            text: response.data.message,
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.href = "/Account/Login";
                        });
                    } else {
                        $scope.showError(response.data.message);
                    }
                }).catch(function (error) {
                    var msg = (error.data && error.data.message) ? error.data.message : "Registration failed";
                    $scope.showError(msg);
                });
            };

            $scope.showError = function (text) {
                Swal.fire({
                    title: 'Registration Error',
                    text: text,
                    icon: 'error',
                    confirmButtonColor: '#764ba2',
                    showClass: { popup: 'animate__animated animate__shakeX' }
                });
            };

            $scope.openLoginForm = function () {
                window.location.replace("/Account/Login");
            }
        }
    ])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });