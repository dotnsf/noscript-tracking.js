// app.js

var cfenv = require( 'cfenv' );
var express = require( 'express' );
var fs = require( 'fs' );
var os = require( 'os' );

var app = express();
var appEnv = cfenv.getAppEnv();

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );


var ids = [];

app.get( '/', function( req, res ){
  res.render( 'index', {} );
});

app.get( '/watch', function( req, res ){
  res.render( 'watch', { ids: ids } );
});

//app.get( '/c*.png', function( req, res ){
app.get( /^\/(\w+)\.png/, function( req, res ){
  //console.log( req.params );
  ids.push( req.params['0'] );

  res.status( 400 );
  res.write( JSON.stringify( { status: false }, 2, null ) );
  res.end();
});



var port = appEnv.port || 3000;
app.listen( port );
console.log( 'server started on ' + port );
