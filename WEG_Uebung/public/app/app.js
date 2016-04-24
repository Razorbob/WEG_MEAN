angular.module('myApp', []) 

	//Injection $http into our controller
	.controller('mainController', function($http){
		var vm = this;

		//API CALL
		$http.get('/api/users')
			.then(function(data){
				//bind the users we recieve to vm.users
				vm.users = data.users;
			});
	});