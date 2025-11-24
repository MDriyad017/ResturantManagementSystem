myApp.factory('foodOrderService', ['$http', 'serviceBasePath',
    function ($http, serviceBasePath) {
        var fac = {};

        fac.SaveFoodOrder = function (
            tableId, totalFoodPrice, selectedFoodForOrderJsonList
        ) {
            return $http({
                method: 'POST',
                url: serviceBasePath + '/api/IN180225',
                dataType: 'json',
                data: JSON.stringify({
                    "TotalFoodPrice": totalFoodPrice,
                    "FoodDetailsList": selectedFoodForOrderJsonList,
                    "TableID": tableId
                }),
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                return response;
            }, function (error) {
                return error;
            });
        };

        fac.paymentProcess = function (
            orderId, tableId
        ) {
            return $http({
                method: 'POST',
                url: serviceBasePath + '/api/U260225',
                dataType: 'json',
                data: JSON.stringify({
                    "OrderId": orderId,
                    "TableID": tableId,
                }),
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                return response;
            }, function (error) {
                return error;
            });
        };

        return fac;
    }
]);