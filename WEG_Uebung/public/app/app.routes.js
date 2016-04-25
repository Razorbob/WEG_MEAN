angular.module('app.routes', ['ngRoute'])
 .config(function($routeProvider, $locationProvider){
 	

 	$routeProvider 
 	//Homepage route
 	.when('/', {
 		templateUrl: '/app/views/pages/home.html'
 	})

 	//Login route
 	.when('/login', {
 		templateUrl : 'app/views/pages/login.html',
 		controller : 'mainController',
 		controllerAs: 'login'
 	})

 	//All users
 	.when('/users', {
 		templateUrl : 'app/views/pages/users/all.html',
 		controller: 'userController',
 		controllerAs: 'user'
 	})

 	.when('/users/create', {
 		templateUrl : 'app/views/pages/users/single.html',
 		controller: 'userCreateController',
 		controllerAs: 'user'
 	})

 	//No Hashes in URL
 	$locationProvider.html5Mode(true).hashPrefix('*');

 });