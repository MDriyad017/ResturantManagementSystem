myApp.controller('homeController', ['$scope', 'applicationBasePath', '$timeout', '$window', '$location', 'foodItemService', 'jwtHelper', 
    function (
        $scope, applicationBasePath, $timeout, $window, $location, foodItemService, jwtHelper
    ) {
        var token = $window.localStorage.getItem('jwtToken');
        if (!token) {
            $window.location.href = "/Account/Login";
            return;
        }
        var payload = jwtHelper.getPayload(token);
        $scope.loggedUser = payload.unique_name || payload.name;

        $scope.clickToOpenOrder = function (tableId, tableName) {
            window.location.href = applicationBasePath + "/FoodOrder/Index?tableId=" + tableId + "&tableName=" + tableName;
        }

        // Helper function to count available tables
        $scope.getAvailableTables = function () {
            if (!$scope.allTableJsonListData) return 0;
            return $scope.allTableJsonListData.filter(function (table) {
                return table.IsAvailableTbl === true;
            }).length;
        };

        var GetAllTableListData = function () {
            foodItemService.FetchTableList(
            ).then(function (value) {
                $scope.allTableJsonListData = value.data;
            }, function (reason) {
                console.log(reason);
            });
        };

        GetAllTableListData();
    }
]);