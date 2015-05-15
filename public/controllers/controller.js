var myApp = angular.module('myApp', []);

myApp.controller('appCtrl', function($scope, $http){
	console.log("Hello World from controller!");

	var refresh = function(){
		$http.get("/contactlist").then(function(response){
			console.log(".get response", response);
			console.log("I got the data I requested");
			$scope.contactlist = response.data;
			$scope.contact = "";
		});	// End .get
	};

	refresh();

	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).then(function(response){
			console.log("response!", response.data);
			refresh();
		});
	};	// End .addContact

	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactlist/' + id).then(function(response){
			refresh();
		});
	};	// End .remove

	$scope.edit = function(id){
		console.log(id);
		$http.get('/contactlist/'+ id).then(function(response){
			$scope.contact = response.data;
		});
	};	// End .edit

	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response){
			refresh();
		})
	};	// End .update

	$scope.deselect = function(){
		$scope.contact = '';
	};	// End .deselect
	
});	// End myApp.controller