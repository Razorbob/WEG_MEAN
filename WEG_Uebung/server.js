// BASE SETUP 
// ====================================== 

// CALL THE PACKAGES -------------------
var express 	= require('express'),			// call expres
	app 		= express(),					// define app using express
	bodyParser	= require('body-parser'),	// get body-parser
	morgan 		= require('morgan'), 			// used to see requests
	mongoose 	= require('mongoose'),
	config 		= require('./config'),
	path 		= require('path');

// APP CONFIGURATION ================== 
// ======================================
// use body parser so we can grab information from POST request

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// configure our app to handle CORS requests 
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', '*');
 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); 
  	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  	next(); 
});

// log all requests to console
app.use(morgan('dev'));

// connect to our db
mongoose.connect(config.database);

// set static file Location
// used for requests the our frontend makes
app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API ================= 
// ==================================== 

// API ROUTES -------------------------
var apiRoutes = require('./app/routes/api')(app,express); 
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE ---------------
// SEND USER TO INDEX ----------------
// has to be registered after API ROUTES 
app.get('*',function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html')); 
})

// START THE Server
// ====================================
app.listen(config.port);
console.log('Server Started on Port: '+config.port);