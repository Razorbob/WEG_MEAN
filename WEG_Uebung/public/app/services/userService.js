angular.module('userService', [])
	.factory('User', function($http){
		//create Factory Object
		var userFactory= {};

		//get a single User
		userFactory.get = function(id){
			return $http.get('/api/users/'+id);
		};

		//get all Users
		userFactory.all = function(){
			return $http.get('/api/users');
		};

		//create User
		userFactory.create = function(userData){
			return $http.post('/api/users/', userData);
		};

		//update User
		userFactory.update = function(id, userData){
			return $http.put('api/users/'+ id, userData);
		};

		//delete User
		userFactory.delete = function(id){
			return $http.delete('/api/users/'+id);
		};

		//return the Object
		return userFactory;
	});