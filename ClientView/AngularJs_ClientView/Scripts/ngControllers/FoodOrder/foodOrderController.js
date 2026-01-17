myApp.controller('foodOrderController', ['$scope', 'applicationBasePath', '$timeout', '$window', '$location', 'foodItemService', 'foodItemService', 'foodOrderService', 
    function (
        $scope, applicationBasePath, $timeout, $window, $location, foodItemService, foodItemService, foodOrderService
    ) {
        const urlParams = new URLSearchParams(window.location.search);

        $scope.tableId = urlParams.get('tableId');
        $scope.tableName = urlParams.get('tableName');
        $scope.confirmOrder = true;
        $scope.foodItemId = 0;
        $scope.totalFoodPrice = 0;
        $scope.foodPhotoFileName = '';
        $scope.SelectedFiles = [];
        $scope.selectedFoodForOrderJsonList = [];

        // Add To Food For Order
        $scope.clickToAddFoods = function (item) {
            var existingFood = $scope.selectedFoodForOrderJsonList.find(x => x.FoodItemID === item.FoodId);
            if (existingFood) {
                // Increase quantity by 1 if the item already exists
                existingFood.Quantity += 1;
                item.Stock -= 1; // Decrease stock
            } else if (item.Stock > 0) {
                // Add new item to the list with default quantity as 1
                $scope.selectedFoodForOrderJsonList.push({
                    FoodItemID: item.FoodId,
                    FoodName: item.FoodName,
                    FoodPrice: item.FoodPrice,
                    Quantity: 1
                });
                item.Stock -= 1; // Decrease stock
                if ($scope.selectedFoodForOrderJsonList.length > 0) {
                    $scope.confirmOrder = false;
                }
            }
            $scope.calculateTotal();
        };

        // Increment Quantity
        $scope.incrementQuantity = function (food) {
            var item = $scope.allFoodsJsonListData.find(x => x.FoodId === food.FoodItemID);
            if (item && item.Stock > 0) {
                food.Quantity += 1;
                item.Stock -= 1; // Decrease stock
            }
            $scope.calculateTotal();
        };

        // Decrement Quantity
        $scope.decrementQuantity = function (food) {
            var item = $scope.allFoodsJsonListData.find(x => x.FoodId === food.FoodItemID);
            if (food.Quantity > 1) {
                food.Quantity -= 1;
                item.Stock += 1; // Increase stock
            } else {
                // Remove item if quantity becomes 0
                const index = $scope.selectedFoodForOrderJsonList.indexOf(food);
                $scope.selectedFoodForOrderJsonList.splice(index, 1);
                item.Stock += 1; // Increase stock
            }
            $scope.calculateTotal();
            if ($scope.selectedFoodForOrderJsonList.length > 0) {
                $scope.confirmOrder = false;
            }
            else {
                $scope.confirmOrder = true;
            }
        };

        // Calculate Total Price
        $scope.calculateTotal = function () {
            $scope.totalFoodPrice = $scope.selectedFoodForOrderJsonList.reduce((sum, food) => {
                return sum + (food.FoodPrice * food.Quantity);
            }, 0).toFixed(2);
        };


        // Filter Category Wise Food
        $scope.filterFoodsCategoryWise = function (category) {
            GetAllFoodListData(category)
        }

        // Save Order
        $scope.clickToSaveOrder = function () {
            foodOrderService.SaveFoodOrder(
                $scope.tableId, $scope.totalFoodPrice, $scope.selectedFoodForOrderJsonList
            ).then(function (value) {
                if (value.data.IsSuccess === true) {
                    Swal.fire({
                        title: 'Success',
                        text: value.data.Message,
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        // Clear the List after confirmation
                        $scope.selectedFoodForOrderJsonList = undefined;
                        $scope.totalFoodPrice = undefined;
                        $scope.confirmOrder = true;
                        $scope.$apply()
                    });
                } else {
                    Swal.fire({
                        title: 'Failed',
                        text: value.data.Message,
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#d33'
                    });
                }
            }).catch(function (error) {
                // Handle errors gracefully
                Swal.fire({
                    title: 'Error',
                    text: 'An error occurred while saving the data. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#d33'
                });
            });
        };

        var GetAllFoodListData = function (category) {
            var q = category === undefined ? '' : category
            foodItemService.FetchFoodList(
                q
            ).then(function (value) {
                $scope.allFoodsJsonListData = value.data;
            }, function (reason) {
                console.log(reason);
            });
        };

        GetAllFoodListData();
    }
]);