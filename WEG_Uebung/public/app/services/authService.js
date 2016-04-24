angular.module('authService', [])

	// =================================================== 
	// auth factory to login and get information 
	// inject $http for communicating with the API 
	// inject $q to return promise objects 
	// inject AuthToken to manage tokens 
	// =================================================== 
	
	.factory('Auth', function($http, $q, AuthToken){

		// create Facotry Object
		var authFactory = {};

		// handle login
		
		// handle logout
		
		// check if a user is logged in
		
		// get the user info
		
		// return authFactory 
		return authFactory;
	})

	// =================================================== 
	// factory for handling tokens 
	// inject $window to store token client-side
	// ===================================================
	
	.factory('AuthToken', function($window){
		// create Facotry Object
		var authTokenFactory = {};

		// get the token
		
		// set the token or clear
		
		// return authTokenFactory 
		return authTokenFactory;
		
	})

	//  ==================================================
	//  application configuration to integrate token into requests
	//  ==================================================
	
	.factory('AuthInterceptor', function($q, AuthToken){
		// create Facotry Object
		var interceptorFactory = {};

		// attach the token to every request
		
		// redirect if a token doesn't authenticate

		// return interceptorFactory 
		return interceptorFactory;


	});