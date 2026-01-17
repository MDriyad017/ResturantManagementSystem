myApp.controller('homeController', ['$scope', 'applicationBasePath', '$timeout', '$window', '$location', 'foodItemService',
    function (
        $scope, applicationBasePath, $timeout, $window, $location, foodItemService,
    ) {
        
        $scope.clickToOpenOrder = function (tableId, tableName) {
            window.location.href = applicationBasePath + "/FoodOrder/Index?tableId=" + tableId + "&tableName=" + tableName;
        }

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