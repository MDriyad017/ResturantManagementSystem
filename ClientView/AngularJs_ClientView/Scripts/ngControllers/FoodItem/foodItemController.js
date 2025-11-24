myApp
    .controller('foodItemController', ['$scope', 'Upload', '$timeout', '$window', '$location', 'applicationBasePath', 'dataTableRows', 'foodItemService',
        'foodOrderService', 
        function (
            $scope, Upload, $timeout, $window, $location, applicationBasePath, dataTableRows, foodItemService, foodOrderService
        ) {
            $scope.tableId = $location.search().tableId;
            $scope.tableName = $location.search().tableName;
            $scope.confirmOrder = true;
            $scope.saveMode = true;
            $scope.showGrid = false;
            $scope.showGridPayment = false;
            $scope.foodItemId = 0;
            $scope.totalFoodPrice = 0;
            $scope.pageIndex = 1;
            $scope.pageIndexPayment = 1;
            $scope.showRecordsInfo = '';
            $scope.showRecordsInfoPayment = '';
            $scope.foodPhotoFileName = '';
            $scope.SelectedFiles = [];
            $scope.selectedFoodForOrderJsonList = [];

            $scope.previous = function (e) {
                e.preventDefault();
                if ($scope.pageIndex > 1) {
                    $scope.pageIndex--;
                    GetAllFoodItemsListData();
                }
            };

            $scope.next = function (e) {
                e.preventDefault();
                if ($scope.pageIndex < lastPageNo) {
                    $scope.pageIndex++;
                    GetAllFoodItemsListData();
                }
            };

            $scope.previousPayment = function (e) {
                e.preventDefault();
                if ($scope.pageIndexPayment > 1) {
                    $scope.pageIndexPayment--;
                    GetAllOrderListData();
                }
            };

            $scope.nextPayment = function (e) {
                e.preventDefault();
                if ($scope.pageIndexPayment < lastPageNoPayment) {
                    $scope.pageIndexPayment++;
                    GetAllOrderListData();
                }
            };

            $scope.filterFoods = function () {
                if ($scope.searchFood !== undefined) {
                    $scope.pageIndex = 1;
                    GetAllFoodItemsListData();
                }
            }

            $scope.ImageUploads = function (files) {
                $scope.SelectedFiles = files;

                if ($scope.SelectedFiles && $scope.SelectedFiles.length) {
                    const imageSrc = URL.createObjectURL($scope.SelectedFiles[0]);
                    const imagePreviewElement = document.querySelector("#foodImage");
                    imagePreviewElement.src = imageSrc;
                    imagePreviewElement.style.display = "block";
                }
            };

            // Save Operation
            $scope.clickSave = function () {
                if ($scope.SelectedFiles && $scope.SelectedFiles.length) {
                    if ($scope.SelectedFiles[0].size / 1024 > 100) {
                        Swal.fire({
                            title: 'Failed',
                            text: 'File size can not be greater than 100 KB.',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#d33'
                        });
                        return false;
                    }
                }

                foodItemService.SaveFoodItem(
                    $scope.foodName, $scope.foodPrice, $scope.foodStock, $scope.categoryId
                ).then(function (value) {
                    if (value.data.IsSuccess) {
                        Swal.fire({
                            title: 'Success',
                            text: value.data.Message,
                            icon: 'success'
                        }).then(() => {
                            UploadFiles(value.data.Message1);
                            $scope.foodName = undefined;
                            $scope.foodPrice = undefined;
                            $scope.foodStock = undefined;
                            $scope.categoryId = undefined;
                            $scope.saveMode = true;
                            GetAllFoodItemsListData();
                            $window.location.reload();

                            // Clear the image preview
                            const imagePreviewElement = document.querySelector("#foodImage");
                            imagePreviewElement.src = "";
                            imagePreviewElement.style.display = "none";

                            // Clear the file name and selected files
                            $scope.fileName = undefined;
                            $scope.SelectedFiles = undefined;

                            // Clear the file input field
                            const fileInputElement = document.querySelector('input[type="file"]');
                            fileInputElement.value = ""; // Reset the input field
                        });
                    }
                    else {
                        Swal.fire({
                            title: 'Failed',
                            text: value.data.Message,
                            icon: 'error',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#d33'
                        });
                    }
                })
                .catch(function () {
                    Swal.fire({
                        title: 'Error',
                        text: 'An error occurred while saving the data. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#d33'
                    });
                });
            };

            $scope.clickToEdit = function (item) {
                $scope.saveMode = false;
                $scope.foodItemId = item.FoodItemID;
                $scope.foodName = item.FoodName;
                $scope.foodPrice = item.FoodPrice;
                $scope.foodStock = item.Stock;
                $scope.categoryId = item.CategoryID.toString();
                $scope.foodPhotoFileName = item.FoodId + ".jpg?" + new Date();
            }

            // Update Operation
            $scope.clickUpdate = function () {
                if ($scope.SelectedFiles && $scope.SelectedFiles.length) {
                    if ($scope.SelectedFiles[0].size / 1024 > 100) {
                        Swal.fire({
                            title: 'Failed',
                            text: 'File size can not be greater than 100 KB.',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#d33'
                        });
                        return false;
                    }
                }

                foodItemService.UpdateFoodItem(
                    $scope.foodItemId, $scope.foodName, $scope.foodPrice, $scope.foodStock, $scope.categoryId
                ).then(function (value) {
                    if (value.data.IsSuccess) {
                        Swal.fire({
                            title: 'Success',
                            text: value.data.Message,
                            icon: 'success'
                        }).then(() => {
                            UploadFiles(value.data.Message1);
                            GetAllFoodItemsListData();
                            $window.location.reload();
                            $scope.foodName = undefined;
                            $scope.foodPrice = undefined;
                            $scope.foodStock = undefined;
                            $scope.categoryId = undefined;
                            $scope.saveMode = true;
                            // Clear the image preview
                            const imagePreviewElement = document.querySelector("#foodImage");
                            imagePreviewElement.src = "";
                            imagePreviewElement.style.display = "none";

                            // Clear the file name and selected files
                            $scope.fileName = undefined;
                            $scope.SelectedFiles = undefined;

                            // Clear the file input field
                            const fileInputElement = document.querySelector('input[type="file"]');
                            fileInputElement.value = ""; // Reset the input field
                        });
                    }
                    else {
                        Swal.fire({
                            title: 'Failed',
                            text: value.data.Message,
                            icon: 'error',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#d33'
                        });
                    }
                })
                .catch(function () {
                    Swal.fire({
                        title: 'Error',
                        text: 'An error occurred while saving the data. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#d33'
                    });
                });
            }

            // Delete Operation
            $scope.clickDelete = function (foodId) {
                foodItemService.DeleteFoodItem(
                    $scope.foodItemId === undefined ? null : foodId
                ).then(function (value) {
                    if (value.data.IsSuccess) {
                        Swal.fire({
                            title: 'Success',
                            text: value.data.Message,
                            icon: 'success'
                        }).then(() => {
                            DeleteFiles(value.data.Message1);
                            GetAllFoodItemsListData();
                            $window.location.reload();
                            $scope.foodName = undefined;
                            $scope.foodPrice = undefined;
                            $scope.foodStock = undefined;
                            $scope.categoryId = undefined;
                            $scope.saveMode = true;
                            // Clear the image preview
                            const imagePreviewElement = document.querySelector("#foodImage");
                            imagePreviewElement.src = "";
                            imagePreviewElement.style.display = "none";

                            // Clear the file name and selected files
                            $scope.fileName = undefined;
                            $scope.SelectedFiles = undefined;

                            // Clear the file input field
                            const fileInputElement = document.querySelector('input[type="file"]');
                            fileInputElement.value = ""; // Reset the input field
                        });
                    }
                    else {
                        Swal.fire({
                            title: 'Failed',
                            text: value.data.Message,
                            icon: 'error',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#d33'
                        });
                    }
                })
                    .catch(function () {
                        Swal.fire({
                            title: 'Error',
                            text: 'An error occurred while saving the data. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#d33'
                        });
                    });
            }

            //=============>>

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

            //=============>>

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

            // Save Order
            $scope.clickToPayment = function (orderId, tableId) {
                foodOrderService.paymentProcess(
                    orderId, tableId
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
                            GetAllOrderListData();
                            $scope.$apply();
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

            $scope.clickToOpenOrder = function (tableId, tableName) {
                window.location.href = applicationBasePath + "/FoodOrder/Index?tableId=" + tableId + "&tableName=" + tableName;
            }

            // Image Upload
            var UploadFiles = function (foodId) {
                if ($scope.SelectedFiles && $scope.SelectedFiles.length) {
                    Upload.upload({
                        url: applicationBasePath + '/ImageUploads/UploadFoodImages/',
                        data: {
                            files: $scope.SelectedFiles,
                            foodId: foodId
                        }
                    }).then(function (response) {
                        $timeout(function () {
                            $scope.Result = response.data;
                            /*$window.location.reload();*/
                        });
                    }, function (response) {
                        if (response.status > 0) {
                            var errorMsg = response.status + ': ' + response.data;
                            console.log(errorMsg);
                        }
                    });
                }
                //else {
                //    $window.location.reload();
                //}
            };

            //Image Delete Operation
            var DeleteFiles = function (foodId) {
                
                Upload.upload({
                    url: applicationBasePath + '/ImageUploads/DeleteFoodImages/',
                    data: {
                        foodId: foodId
                    }
                }).then(function (response) {
                    $timeout(function () {
                        $scope.Result = response.data;
                        /*$window.location.reload();*/
                    });
                }, function (response) {
                    if (response.status > 0) {
                        var errorMsg = response.status + ': ' + response.data;
                        console.log(errorMsg);
                    }
                });
            };

            var GetCategoryListForDropdown = function () {
                foodItemService.FetchCategoryDropDown(
                ).then(function (value) {
                    $scope.foodCategoryListDropDownJsonData = value.data;
                    $.each(value.data, function () {
                        if (this.IsSelected) {
                            $scope.categoryId = this.Value;
                        }
                    });
                }, function (reason) {
                    console.log(reason);
                });
            };

            var GetAllFoodItemsListData = function () {
                var q = $scope.searchFood === undefined ? '' : $scope.searchFood 

                foodItemService.FetchFoodItemsList(
                    q, $scope.pageIndex, dataTableRows
                ).then(function (value) {
                    $scope.allFoodItemJsonListData = value.data;

                    lastPageNo = value.data.LastPageNo;
                    if (value.data.TotalNumberOfRecords > 0) {
                        $scope.showGrid = true;
                        $scope.showRecordsInfo = 'Record(s) showing ' + value.data.Start + " to " + value.data.End + " of " + value.data.TotalNumberOfRecords;
                    }
                    else {
                        $scope.showGrid = false;
                        $scope.showRecordsInfo = "No record(s) found...";
                    }
                }, function (reason) {
                    console.log(reason);
                });
            }

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

            var GetAllTableListData = function () {
                foodItemService.FetchTableList(
                ).then(function (value) {
                    $scope.allTableJsonListData = value.data;
                }, function (reason) {
                    console.log(reason);
                });
            };

            var GetAllOrderListData = function () {
                var q = $scope.tableName === undefined ? '' : $scope.tableName;

                foodItemService.FetchOrderList(
                    q, $scope.pageIndexPayment, dataTableRows
                ).then(function (value) {
                    $scope.allOrderJsonListData = value.data;

                    lastPageNoPayment = value.data.LastPageNo;
                    if (value.data.TotalNumberOfRecords > 0) {
                        $scope.showGridPayment = true;
                        $scope.showRecordsInfoPayment = 'Record(s) showing ' + value.data.Start + " to " + value.data.End + " of " + value.data.TotalNumberOfRecords;
                    } else {
                        $scope.showGridPayment = false;
                        $scope.showRecordsInfoPayment = "No record(s) found...";
                    }
                }, function (reason) {
                    console.log(reason);
                });
            };

            GetAllOrderListData();

            GetAllFoodItemsListData();
            GetCategoryListForDropdown();
            GetAllFoodListData();
            GetAllTableListData();
            GetAllOrderListData();
        }
    ])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });