#!/bin/env node
// Module dependencies.
var application_root = __dirname,
	http = require('http'),
	express = require( 'express' ), //Web framework
	path = require( 'path' ) //Utilities for dealing with file paths

//Get the environment variables for the web server
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;

// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}


//Create server
var app = express();

// Configure server
app.configure( function() {

	//set the path for static content
	var static_path = path.join( application_root, 'site')

	//replacement for express.bodyParser()
	app.use(express.json());
	app.use(express.urlencoded());

	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );

	//Set up static middleware to use path static content
	app.use( express.static( static_path ) );

	//perform route lookup based on url and HTTP method
	app.use( app.router );


});



//Start server
app.listen(port, ipaddr, function() {
   console.log('%s: Node server started on %s:%d ...', Date(Date.now() ), ipaddr, port);
});





