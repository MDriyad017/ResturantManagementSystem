myApp.controller('layoutController', ['$scope', '$window', 'jwtHelper', 'applicationBasePath', 
    function (
        $scope, $window, jwtHelper, applicationBasePath
    ) {
        $scope.toggleSidebar = function () {
            angular.element(document.body).toggleClass("sidebar-toggled");
            angular.element(document.querySelector(".sidebar")).toggleClass("toggled");
        };

        var token = $window.localStorage.getItem('jwtToken');

        if (token) {
            try {
                var payload = jwtHelper.getPayload(token);
                if (payload) {
                    $scope.userName = payload.unique_name || payload.name || "User";
                    $scope.userRole = payload.role;
                }
            } catch (e) {
                console.error("Token decoding failed", e);
                $scope.logout(); // Clean up if token is corrupt
            }
        }

        $scope.logout = function () {
            $window.localStorage.removeItem('jwtToken');
            window.location.href = applicationBasePath + "/Account/Login";
            //$window.location.href = "/Account/Login";
        };
    }
]);