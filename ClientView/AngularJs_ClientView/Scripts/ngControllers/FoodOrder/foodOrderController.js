myApp.controller('foodOrderController', ['$scope', 'applicationBasePath', '$timeout', '$window', 'jwtHelper', '$location', 'foodItemService', 'foodOrderService', 
    function (
        $scope, applicationBasePath, $timeout, $window, jwtHelper, $location, foodItemService, foodOrderService
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
        $scope.allFoodsJsonListData = [];
        $scope.masterFoodsList = [];
        $scope.selectedCat = 'ALL';

        var token = $window.localStorage.getItem('jwtToken');
        if (token) {
            try {
                var payload = jwtHelper.getPayload(token);
                if (payload) {
                    $scope.userName = payload.unique_name || payload.name || "User";
                    $scope.userRole = payload.role;
                    $scope.userId = payload.UserId;
                }
            } catch (e) {
                console.error("Token decoding failed", e);
                $scope.logout(); // Clean up if token is corrupt
            }
        }

        // Updated calculateTotal for precision
        $scope.calculateTotal = function () {
            let total = $scope.selectedFoodForOrderJsonList.reduce((sum, food) => {
                return sum + (food.FoodPrice * food.Quantity);
            }, 0);
            $scope.totalFoodPrice = total.toFixed(2);
        };

        // clickToAddFoods to also use master list
        $scope.clickToAddFoods = function (item) {
            var existingFood = $scope.selectedFoodForOrderJsonList.find(x => x.FoodItemID === item.FoodId);

            // Find the item in master list
            var masterItem = $scope.masterFoodsList.find(x => x.FoodId === item.FoodId);

            if (existingFood) {
                // Increase quantity by 1 if the item already exists
                existingFood.Quantity += 1;
                masterItem.Stock -= 1;

                // Update filtered view if item exists
                var filteredItem = $scope.allFoodsJsonListData.find(x => x.FoodId === item.FoodId);
                if (filteredItem) {
                    filteredItem.Stock -= 1;
                }
            } else if (masterItem && masterItem.Stock > 0) {
                // Add new item to the list with default quantity as 1
                $scope.selectedFoodForOrderJsonList.push({
                    FoodItemID: item.FoodId,
                    FoodName: item.FoodName,
                    FoodPrice: item.FoodPrice,
                    Quantity: 1
                });
                masterItem.Stock -= 1;

                // Update filtered view if item exists
                var filteredItem = $scope.allFoodsJsonListData.find(x => x.FoodId === item.FoodId);
                if (filteredItem) {
                    filteredItem.Stock -= 1;
                }

                if ($scope.selectedFoodForOrderJsonList.length > 0) {
                    $scope.confirmOrder = false;
                }
            }
            $scope.calculateTotal();
        };

        // Increment Quantity
        $scope.incrementQuantity = function (food) {
            // Find the item in the master list instead of filtered list
            var masterItem = $scope.masterFoodsList.find(x => x.FoodId === food.FoodItemID);

            if (masterItem && masterItem.Stock > 0) {
                food.Quantity += 1;
                masterItem.Stock -= 1;

                // Also update the stock in the filtered view if the item exists there
                var filteredItem = $scope.allFoodsJsonListData.find(x => x.FoodId === food.FoodItemID);
                if (filteredItem) {
                    filteredItem.Stock -= 1;
                }
            }
            $scope.calculateTotal();
        };

        // Decrement Quantity
        $scope.decrementQuantity = function (food) {
            // Find the item in the master list
            var masterItem = $scope.masterFoodsList.find(x => x.FoodId === food.FoodItemID);

            if (food.Quantity > 1) {
                food.Quantity -= 1;
                masterItem.Stock += 1;

                // Update filtered view if item exists
                var filteredItem = $scope.allFoodsJsonListData.find(x => x.FoodId === food.FoodItemID);
                if (filteredItem) {
                    filteredItem.Stock += 1;
                }
            } else {
                // Remove item if quantity becomes 0
                const index = $scope.selectedFoodForOrderJsonList.indexOf(food);
                $scope.selectedFoodForOrderJsonList.splice(index, 1);
                masterItem.Stock += 1;

                // Update filtered view if item exists
                var filteredItem = $scope.allFoodsJsonListData.find(x => x.FoodId === food.FoodItemID);
                if (filteredItem) {
                    filteredItem.Stock += 1;
                }
            }
            $scope.calculateTotal();

            if ($scope.selectedFoodForOrderJsonList.length > 0) {
                $scope.confirmOrder = false;
            } else {
                $scope.confirmOrder = true;
            }
        };

        // Calculate Total Price
        $scope.filterFoodsCategoryWise = function (category) {
            $scope.selectedCat = category;
            GetAllFoodListData(category);
        }

        // Save Order
        $scope.clickToSaveOrder = function () {
            foodOrderService.SaveFoodOrder(
                $scope.userId, $scope.tableId, $scope.totalFoodPrice, $scope.selectedFoodForOrderJsonList
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

        var GetCategoryListForDropdown = function () {
            foodItemService.FetchCategoryDropDown(
            ).then(function (value) {
                $scope.foodCategoryListDropDownJsonData = value.data.filter(x => x.Value != '');

                // Add "All Dishes" to the beginning of the array
                $scope.foodCategoryListDropDownJsonData.unshift({
                    Item: "All Dishes",
                    Value: "ALL",
                    IsSelected: false
                });

                $.each(value.data, function () {
                    if (this.IsSelected) {
                        $scope.categoryId = this.Value;
                    }
                });

            }, function (reason) {
                console.log(reason);
            });
        };

        var GetAllFoodListData = function (category) {
            var q = category === undefined || category == 'ALL' ? 0 : category;
            foodItemService.FetchFoodList(
                q
            ).then(function (value) {
                // Store the complete list first time
                if (!$scope.masterFoodsList || $scope.masterFoodsList.length === 0) {
                    $scope.masterFoodsList = angular.copy(value.data);
                }

                // Store the server response for filtered view
                $scope.allFoodsJsonListData = value.data;

                // If cart has items, adjust stock counts in the filtered view
                if ($scope.selectedFoodForOrderJsonList && $scope.selectedFoodForOrderJsonList.length > 0) {
                    // Create a map of cart quantities
                    const cartQuantities = {};
                    $scope.selectedFoodForOrderJsonList.forEach(item => {
                        cartQuantities[item.FoodItemID] = item.Quantity;
                    });

                    // Update stock in the displayed data
                    $scope.allFoodsJsonListData.forEach(food => {
                        const cartQty = cartQuantities[food.FoodId];
                        if (cartQty) {
                            // Subtract cart quantity from available stock
                            const availableStock = food.Stock - cartQty;
                            food.Stock = Math.max(0, availableStock);

                            // Update availability
                            if (food.Stock === 0) {
                                food.Available = false;
                            }
                        }
                    });
                }

            }, function (reason) {
                console.log(reason);
            });
        };

        GetAllFoodListData();
        GetCategoryListForDropdown();
    }
]);