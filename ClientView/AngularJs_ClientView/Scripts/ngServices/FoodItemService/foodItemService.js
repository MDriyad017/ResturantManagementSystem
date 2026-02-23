myApp
    .factory('foodItemService', ['$http', 'serviceBasePath',
        function ($http, serviceBasePath) {
            var fac = {};

            fac.FetchTableList = function () {
                return $http({
                    method: 'GET',
                    url: serviceBasePath + '/api/G220225'
                }).then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            };

            fac.FetchFoodList = function (q) {
                return $http({
                    method: 'GET',
                    url: serviceBasePath + '/api/G020125'
                        + '?categoryId=' + q
                }).then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            };

            fac.FetchFoodItemsList = function (
                q, pageIndex, pageSize
            ) {
                return $http({
                    method: 'GET',
                    url: serviceBasePath + '/api/G281224'
                        + '?query=' + q
                        + '&pageIndex=' + pageIndex
                        + '&pageSize=' + pageSize
                }).then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            };

            fac.FetchCategoryDropDown = function () {
                return $http({
                    method: 'GET',
                    url: serviceBasePath + '/api/C091224'
                }).then(function (response) {
                    return response;
                }, function (error) {
                    console.log("Error: ", error);
                    return error;
                });
            }

            fac.SaveFoodItem = function (
                foodName, foodPrice, foodStock, categoryId
            ) {
                return $http({
                    method: 'POST',
                    url: serviceBasePath + '/api/IN141024',
                    dataType: 'json',
                    data: JSON.stringify({
                        "FoodName": foodName,
                        "FoodPrice": foodPrice,
                        "Stock": foodStock,
                        "CategoryID": categoryId
                    }),
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            };

            fac.UpdateFoodItem = function (
                foodItemId, foodName, foodPrice, foodStock, categoryId
            ) {
                return $http({
                    method: 'POST',
                    url: serviceBasePath + '/api/U281224',
                    dataType: 'json',
                    data: JSON.stringify({
                        "FoodItemID": foodItemId,
                        "FoodName": foodName,
                        "FoodPrice": foodPrice,
                        "Stock": foodStock,
                        "CategoryID": categoryId
                    }),
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            };

            fac.DeleteFoodItem = function (
                foodItemId
            ) {
                return $http({
                    method: 'POST',
                    url: serviceBasePath + '/api/D281224'
                        + '?FoodItemId=' + foodItemId
                    //dataType: 'json',
                    //data: JSON.stringify({
                    //    "FoodItemId": foodItemId,
                    //}),
                    //headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            };

            fac.FetchOrderList = function (
                q, pageIndex, pageSize
            ) {
                return $http({
                    method: 'GET',
                    url: serviceBasePath + '/api/G250225'
                        + '?query=' + q
                        + '&pageIndex=' + pageIndex
                        + '&pageSize=' + pageSize
                }).then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            };

            fac.FetchOrderDetailList = function (
                orderId
            ) {
                return $http({
                    method: 'GET',
                    url: serviceBasePath + '/api/G220226'
                        + '?orderId=' + orderId
                }).then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            };

            return fac;
        }
    ])