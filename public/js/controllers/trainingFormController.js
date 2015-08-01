app.controller('trainingsFormController', ['$scope', function($scope) {

    $scope.sessions = [1,2,3,4,5,6,7,8,9,10];

    $scope.durations = [
        {time:'10s', value: 10},
        {time:'15s', value: 15},
        {time:'20s', value: 20},
        {time:'25s', value: 25},
        {time:'30s', value: 30},
        {time:'35s', value: 35},
        {time:'40s', value: 40},
        {time:'1m', value: 60},
        {time:'1.5m', value: 90},
        {time:'2m', value: 120},
        {time:'2.5m', value: 150},
        {time:'3m', value: 180}
    ]; 

    $scope.strokes = [10, 15, 20, 25, 30 ,35, 40 ,45, 50, 55, 60];

}]);
