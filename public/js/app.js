var app = angular.module('app', []);
/*
 * Provides the AngularJS module and controller 
 * definitions to support AngularJS code in the
 * view files already mentioned
 */
app.controller('usersController', ['$scope', '$http', function($scope, $http) {
	$http.get('/user/profile')
	.success(function(data, status, headers, config) { 
		$scope.user = data;
		$scope.error = "";
	}).
	error(function(data, status, headers, config) { 
		$scope.user = {}; 
		$scope.error = data;
	});
}]);

