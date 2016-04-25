angular.module('mainCtrl', [])
 .controller('mainController', function($rootScope, $location, Auth){
 	var vm = this;

 	//get info if person is logged in
 	vm.loggedIn = Auth.isLoggedIn();

 	//check if logged in on every Request
 	$rootScope.$on('$routeChangeStart', function(){
 		vm.loggedIn = Auth.isLoggedIn();
 		//get user info on route Change

 		Auth.getUser()
 		 .then(function(data) { 
 		 	vm.user = data.data;
 		 })
 		 .catch(function(data){

 		 	
 		 }) 
 	});

 	//Function to handle Login Form
 	vm.doLogin = function(){
 		vm.processing = true;
 		vm.error = '';
 		Auth.login(vm.loginData.username, vm.loginData.password)
 		 .success(function(data) { 
 		 	if(data.success){
 		 		vm.processing = false;
 		 		$location.path('/users');
 		 	}else{
 		 		vm.processing = false;
 		 		vm.error = data.message;
 		 	}
 		 	
 		 });
 	};

 	//Function to handle Logout
 	vm.doLogout = function(){
 		Auth.logout();
 		$location.path('/login');
 	};
 });