var app = angular.module('flightSearch' ,[]);

app.config(['$httpProvider', function($httpProvider) {

    $httpProvider.defaults.useXDomain = true;

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

app.controller("MainCtrl", ['$scope', '$http',
    function($scope, $http) {
        $scope.availableFlights = [];
        $scope.fNumberError=false;
        $scope.dateError=false;
        $scope.getSearchResult = function(fNumber, origin, destination, date) {
            if(!fNumber && (!origin || !destination)) {
                $scope.fNumberError=true;
                $scope.dateError=false;
                $scope.availableFlights = [];
                return;
            } else if(!date) {
                $scope.dateError=true;
                $scope.fNumberError=false;
                $scope.availableFlights = [];
                return;
            }
            else {
                $scope.fNumberError=false;
                $scope.dateError=false;
                $scope.availableFlights = [];
                $http({
                    url :'http://localhost:3000/api/flights/',
                    method: "GET",
                    params : { fNumber:fNumber, origin:origin, destination:destination, date:date}
                }).
                success(function(data) {
                    console.log("data", data);
                $scope.availableFlights = data;
             });
            }
        };
}]);

