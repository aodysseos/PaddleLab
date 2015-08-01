app.service('trainingForm', ['http', function($http){
	this.post = function(uploadUrl, data){
		var form_data = new FormData();
		for (var key in data) form_data.append(key, data[key]);
		$http.post(uploadUrl, form_data, {
			transformRequest: angular.indentity,
			headers: { 'Content-Type': undefined }
		})
	}
}])