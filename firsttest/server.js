var express = require('express'),
	app = express(),
	path = require('path'),
	adminRouter = express.Router();


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