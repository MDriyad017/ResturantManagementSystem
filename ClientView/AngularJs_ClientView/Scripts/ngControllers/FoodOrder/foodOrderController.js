myApp.controller('foodOrderController', ['$scope', 'applicationBasePath', 'dataTableRows', 'foodItemService', 
    function (
        $scope, dataTableRows, foodItemService
    ) {

        $scope.foodItemId = 0;
        $scope.totalFoodPrice = 0;
        $scope.foodPhotoFileName = '';
        $scope.SelectedFiles = [];
        $scope.selectedFoodForOrderJsonList = [];

        // Add To Food For Order
        $scope.clickToAddFoods = function (item) {
            var existingFood = $scope.selectedFoodForOrderJsonList.find(x => x.FoodItemID === item.FoodId);
            if (existingFood) {
                existingFood.Quantity += 1;
                item.Stock -= 1;
            } else if (item.Stock > 0) {
                $scope.selectedFoodForOrderJsonList.push({
                    FoodItemID: item.FoodId,
                    FoodName: item.FoodName,
                    FoodPrice: item.FoodPrice,
                    Quantity: 1
                });
                item.Stock -= 1;
            }
            $scope.calculateTotal();
        };

        // Increment Quantity
        $scope.incrementQuantity = function (food) {
            var item = $scope.allFoodItemJsonListData.Data.find(x => x.FoodId === food.FoodItemID);
            if (item && item.Stock > 0) {
                food.Quantity += 1;
                item.Stock -= 1;
            }
            $scope.calculateTotal();
        };

        // Decrement Quantity
        $scope.decrementQuantity = function (food) {
            var item = $scope.allFoodItemJsonListData.Data.find(x => x.FoodId === food.FoodItemID);
            if (food.Quantity > 1) {
                food.Quantity -= 1;
                item.Stock += 1;
            } else {
                const index = $scope.selectedFoodForOrderJsonList.indexOf(food);
                $scope.selectedFoodForOrderJsonList.splice(index, 1);
                item.Stock += 1;
            }
            $scope.calculateTotal();
        };

        // Calculate Total Price
        $scope.calculateTotal = function () {
            $scope.totalFoodPrice = $scope.selectedFoodForOrderJsonList.reduce((sum, food) => {
                return sum + (food.FoodPrice * food.Quantity);
            }, 0).toFixed(2);
        };

        // Filter Category Wise Food
        $scope.filterFoodsCategoryWise = function (category) {
            GetAllFoodListData(category);
        };

        var GetAllFoodListData = function (category) {
            var q = category === undefined ? '' : category
            foodItemService.FetchFoodList(
                q
            ).then(function (value) {
                $scope.allFoodItemJsonListData = value.data;
            }, function (reason) {
                console.log(reason);
            });
        };

        GetAllFoodListData();
    }
]);