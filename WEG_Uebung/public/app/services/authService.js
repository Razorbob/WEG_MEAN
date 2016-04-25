angular.module('authService', [])

	// =================================================== 
	// auth factory to login and get information 
	// inject $http for communicating with the API 
	// inject $q to return promise objects 
	// inject AuthToken to manage tokens 
	// @param $q => return Promisses
	// @param AuthToken => AuthToken Factory
	// =================================================== 
	
	.factory('Auth', function($http, $q, AuthToken){

		// create Facotry Object
		var authFactory = {};

		// handle login
		authFactory.login = function(username, password){
			return $http.post('/api/authenticate', {
				username: username,
				password: password
			})
			.success(function(data){
				
				AuthToken.setToken(data.token);
				return data;
			});
		};

		// handle logout
		authFactory.logout = function(){
			AuthToken.setToken();
		};


		// check if a user is logged in
		// check if lokal Token exists
		authFactory.isLoggedIn = function(){
			if(AuthToken.getToken())
				return true;
			else
				return false;
		}


		// get the user info
		authFactory.getUser = function(){
			if(AuthToken.getToken()){
				return $http.get('/api/me', {cache: true});
			}
			else
				return $q.reject({ message: 'User has no token.' }); 
		};
		
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

		// get the token out of local Storage
		authTokenFactory.getToken = function() {
			return $window.localStorage.getItem('token');
		};
		
		// set the token or clear
		// if a token is passed, set the token
		// if there is no token, clear it from local storage
		authTokenFactory.setToken = function(token){
			if(token)
				$window.localStorage.setItem('token', token);
			else
				$window.localStorage.removeItem('token');
		};
		
		// return authTokenFactory 
		return authTokenFactory;
		
	})

	//  ==================================================
	//  application configuration to integrate token into requests
	//  ==================================================
	
	.factory('AuthInterceptor', function($q, $location, AuthToken){
		// create Facotry Object
		var interceptorFactory = {};

		// attach the token to every HTTP request
		interceptorFactory.request = function(config){

			//grab Token
			var token = AuthToken.getToken();

			//if Token exists add it to the x-access-token attribute in Header
			if(token)
				config.headers['x-access-token'] = token;

			return config;
		};


		// redirect if a token doesn't authenticate
		interceptorFactory.responseError = function(response) { 

			//if we get 403 from server
			if(response.status == 403)
				$location.path('/login');

			return $q.reject(response);
		};
		// return interceptorFactory 
		return interceptorFactory;
	});