myApp
    .factory('foodCategoryService', ['$http', 'serviceBasePath',
        function ($http, serviceBasePath) {
            var fac = {};

            fac.FetchFoodCategoryLists = function (
                q, pageIndex, pageSize
            ) {
                return $http({
                    method: 'GET',
                    url: serviceBasePath + '/api/241124'
                        + '?query=' + q
                        + '&pageIndex=' + pageIndex
                        + '&pageSize=' + pageSize
                }).then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            };

            fac.SaveFoodCategory = function (
                categoryName
            ) {
                return $http({
                    method: 'POST',
                    url: serviceBasePath + '/api/IN281124',
                    dataType: 'json',
                    data: JSON.stringify({
                        "CategoryName": categoryName
                    }),
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            };

            fac.UpdateFoodCategory = function (
                categoryId, categoryName
            ) {
                return $http({
                    method: 'POST',
                    url: serviceBasePath + '/api/U301124',
                    dataType: 'json',
                    data: JSON.stringify({
                        "CategoryID": categoryId,
                        "CategoryName": categoryName
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
    ])