app.controller('trainingsController', ['$scope', '$http', function($scope, $http) {
    $http.get('/trainings/all')
    .success(function(data, status, headers, config) { 
        $scope.trainings = data;
        $scope.error = "";
        console.log(data);
    }).
    error(function(data, status, headers, config) { 
        $scope.user = {}; 
        $scope.error = data;
        console.log(data);
    });
}]);