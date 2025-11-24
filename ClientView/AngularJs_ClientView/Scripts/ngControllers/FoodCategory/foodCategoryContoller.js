myApp
    .controller('foodCategoryContoller', ['$scope', 'dataTableRows', 'foodCategoryService',
        function (
            $scope, dataTableRows, foodCategoryService
        ) {
            $scope.saveMode = true;
            $scope.showGrid = false;
            $scope.foodCategoryId = 0;
            $scope.pageIndex = 1;
            $scope.showRecordsInfo = '';
            $scope.allFoodCategoryJsonLists = [];


            $scope.previous = function (e) {
                e.preventDefault();
                if ($scope.pageIndex > 1) {
                    $scope.pageIndex--;
                    GetAllFoodCategoryListData();
                }
            };

            $scope.next = function (e) {
                e.preventDefault();
                if ($scope.pageIndex < lastPageNo) {
                    $scope.pageIndex++;
                    GetAllFoodCategoryListData();
                }
            };

            $scope.filterCategory = function(){
                if ($scope.searchCategory !== undefined) {
                    $scope.pageIndex = 1;
                    GetAllFoodCategoryListData();
                }
            }

            $scope.clickSave = function () {
                foodCategoryService.SaveFoodCategory(
                    $scope.categoryName
                ).then(function (value) {
                    if (value.data.IsSuccess === true) {
                        Swal.fire({
                            title: 'Success',
                            text: value.data.Message,
                            icon: 'success',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#3085d6'
                        }).then(() => {
                            // Clear the input field after confirmation
                            $scope.categoryName = undefined;
                            $scope.saveMode = true;
                            GetAllFoodCategoryListData();
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

            $scope.clickToEdit = function(item){
                $scope.saveMode = false;
                $scope.foodCategoryId = item.CategoryID;
                $scope.categoryName = item.CategoryName;
            }

            $scope.clickUpdate = function(){
                foodCategoryService.UpdateFoodCategory(
                    $scope.foodCategoryId, $scope.categoryName
                ).then(function (value) {
                    if (value.data.IsSuccess === true) {
                        Swal.fire({
                            title: 'Success',
                            text: value.data.Message,
                            icon: 'success',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#3085d6'
                        }).then(() => {
                            // Clear the input field after confirmation
                            $scope.categoryName = undefined;
                            $scope.saveMode = true;
                            GetAllFoodCategoryListData();
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
            }

            // load all Charge lists
            var GetAllFoodCategoryListData = function () {
                var q = $scope.searchCategory === undefined ? '' : $scope.searchCategory 
                foodCategoryService.FetchFoodCategoryLists(
                    q, $scope.pageIndex, dataTableRows
                ).then(function (value) {
                    $scope.allFoodCategoryJsonLists = value.data;

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

            GetAllFoodCategoryListData();
        }
    ])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });