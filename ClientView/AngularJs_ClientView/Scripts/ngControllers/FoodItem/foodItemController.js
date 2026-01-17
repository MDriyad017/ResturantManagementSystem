myApp
    .controller('foodItemController', ['$scope', 'Upload', '$timeout', '$window', '$location', 'applicationBasePath', 'dataTableRows', 'foodItemService',
        function (
            $scope, Upload, $timeout, $window, $location, applicationBasePath, dataTableRows, foodItemService
        ) {
            $scope.saveMode = true;
            $scope.showGrid = false;
            $scope.foodItemId = 0;
            $scope.pageIndex = 1;
            $scope.showRecordsInfo = '';
            $scope.foodPhotoFileName = '';
            $scope.SelectedFiles = [];

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

            GetAllFoodItemsListData();
            GetCategoryListForDropdown();
        }
    ])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });