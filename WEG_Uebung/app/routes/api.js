var User 	= require('../models/Patient'),
 	jwt 	= require('jsonwebtoken'),
 	config 	= require('../../config');

var superSecret = config.secret;
module.exports = function(app, express) {
	var apiRouter = express.Router(); 

	// route to authenticate a user (POST http://localhost:8080/api/authenticate)
	apiRouter.post('/authenticate', function(req, res) { 
		console.log(req.body.username);
		User.findOne({ 
			username: req.body.username
		}).select('name username password').exec(function(err, user) { 
			if (err) throw err; 
			// no user with that username was found
			if (!user) {
				console.log('wrong User');
				res.json({
					success: false,
					message: 'Authentication failed. User not found.'
				});
			} else if (user){
				var validPassword = user.comparePassword(req.body.password);
				if (!validPassword) {
					console.log('wrong Password');
					res.json({
						success: false,
						message: 'Authentication failed. Wrong password.'
					});
				} else {
					// if user is found and password is right
					// create a token
					var token = jwt.sign({name: ''+user.name, username: ''+user.username},
						superSecret, 
						{ expiresInMinutes: 1440 // expires in 24 hours 
					});

					// return the information including token as JSON
					res.json({
						success: true,
						message: 'Enjoy your Token!',
						token: token
					});
				}
			}

		});
	});

	//route middleware to verify a token 
	apiRouter.use(function(req, res, next){
		console.log('Somone accessed our app')
		
		// check header or url parameters or post parameters for token 
		var token = req.body.token || req.params.token || req.headers['x-access-token']; 

		//decode Token
		if(token){
			jwt.verify(token, superSecret, function(err, decoded){
				if(err){
					res.json({success: false, message: 'authentication failed'})
				}else{
					req.decoded = decoded;
					next();
				}
			});
		}else{
			//no token
			//return 403 Forbidden
			console.log("no Token provided");
			return res.status(403).send({ success: false, message: 'No token provided'});
		}
	});

	// test route to make sure everything is working 
	apiRouter.get('/',function(req,res){
		res.json({message: 'Hurray api Working!'});
	});

	// api endpoint to get user information 
	apiRouter.get('/me', function(req, res) {
		console.log(req.decoded);
	 	res.send(req.decoded); 
	}); 

	//on Routes that end with /users
	apiRouter.route('/users')
		//create User
		.post(function(req,res){	
			var user= new User();
			user.name = req.body.name;
			user.username = req.body.username;
			user.password = req.body.password;

			user.save(function(err){
				if(err) res.send(err);

				//return a message
				res.json({message: 'User created!'});
			});
		})

		//get a List of Users
		.get(function(req,res){
			User.find(function(err, users){
				if(err) res.send(err);

				//return the users
				res.json(users);
			});
		});


	//on Routes that end with /users/:user_id
	apiRouter.route('/users/:user_id')
		.get(function(req,res){
			User.findById(req.params.user_id, function(err,user){
				if(err) res.send(err);
				
				//return user
				res.json(user);
			});
		})

		.put(function(req,res){
			User.findById(req.params.user_id, function(err,user){
				if(err) res.send(err);

				//Update User if attribute exists in request
				if(req.body.name) user.name = req.body.name; 
				if(req.body.username) user.username = req.body.username;
				if(req.body.password) user.password = req.body.password;

				//Save user
				User.save(function(req,res){
					if(err) res.send(err);

					res.json({message: 'User updated!'});
				});
			});
		})

		//delete User by ID
		.delete(function(req,res){
			User.remove({_id: req.params.user_id},
			function(err, user){
				if(err) res.send(err);
				res.json({message: 'User deleted!'});
			});

		});

	
	return apiRouter;
};