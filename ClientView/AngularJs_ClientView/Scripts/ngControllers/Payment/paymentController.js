myApp.controller('paymentController', ['$scope', 'applicationBasePath', '$timeout', '$window', 'dataTableRows', 'foodItemService', 'foodOrderService', 
    function (
        $scope, applicationBasePath, $timeout, $window, dataTableRows, foodItemService, foodOrderService
    ) {
        $scope.tableName = '';
        $scope.showGridPayment = false;
        $scope.pageIndexPayment = 1;
        $scope.showRecordsInfoPayment = '';

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
    }
]);