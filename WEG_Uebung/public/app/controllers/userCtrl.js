angular.module('userCtrl', ['userService'])

// user controller for the main page
// inject the User factory
 .controller('userController', function(User) {
 	var vm = this;

 	//set a proccessing variable to show loading things
 	vm.processing = true;

 	//Delete a User, Reload the View
 	vm.deleteUser = function(id) { 
 		vm.processing = true;
 		User.delete(id)
 			.success(function(data){
 				User.all()
 					.success(function(data) { 
 						vm.processing = false;
 						vm.users = data;
 					});
 			});

 	};

 	// grab all the users at page load 
 	User.all() 
 	 .success(function(data) { 
 	 	// when all the users come back, remove the processing variable 
 	 	vm.processing = false; 
 	 	// bind the users that come back to vm.users 
 	 	vm.users = data; 
 	 });
})

 // controller applied to user creation page
 .controller('userCreateController', function(User){
 	var vm = this;

 	// variable to hide/show elements of the view
 	// differentiates between create or edit pages
 	vm.type = 'create';

 	//function to create user
 	vm.saveUser = function(){
 		vm.processing = true;

 		// clear the message
 		vm.message = '';

 		// use the create function in the userService 
 		User.create(vm.userData)
 				.success(function(data){
	 				vm.processing = false;

	 				//clear the form
	 				vm.userData={};
	 				vm.message = data.message; 
 				});	
 	};
 })