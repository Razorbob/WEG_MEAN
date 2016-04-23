var express = require('express'),
	app = express(),
	path = require('path'),
	adminRouter = express.Router();



// App.route equals express.Router();
app.route('/login')
					.get(function(req,res){
						res.send('This is the LoginForm');
					})
					.post(function(req,res){
						console.log('Processing Login');
						res.send('processing Login!');
					});
















// Middlewar to log all request Mehtods and URL of Route localhost:1337/admin/*
adminRouter.use(function(req,res,next){
	console.log(req.method, req.url);
	next();
});

// localhost:1337/admin/
adminRouter.get('/', function(req,res){
	res.send('Dashboard');
});
// localhost:1337/admin/users
adminRouter.get('/users', function(req,res){
	res.send('Users');
});
// localhost:1337/admin/posts
adminRouter.get('/posts', function(req,res){
	res.send('Posts');
});

//middleware for parameter validation
adminRouter.param('name', function(req,res,next,name){
	console.log('Validation on '+name);

	name=name+' valid';
	req.name=name;
	
	next();
});

// Route with parameter :name => accessible through req.params.name
adminRouter.get('/users/:name', function(req,res){
	res.send('hello '+req.name+'!');
});

app.use('/admin',adminRouter);

/*
 *  Send Index to User Requesting localhost:1337/
 *	example:   www.johannes.com
 */
 app.get('/',function(req,res){
 	res.sendFile(path.join(__dirname+'/index.html'));
 });


/*
 *  Let the APP listen to Port 1337
 */
 app.listen(1337);
console.log('Server startet Localhost:1337');