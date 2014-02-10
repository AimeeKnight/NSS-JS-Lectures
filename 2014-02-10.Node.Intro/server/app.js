'use strict';

// GET DEPENDENCIES
// get everything in required files and store it in a variable
var express = require('express');
var home = require('./routes/home');
var math = require('./routes/math');
// start express and put it in var app
var app = express();

// CONFIGURE DEPENDENCIES
app.set('port', process.env.PORT || 4000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// home is an object with index property
app.get('/', home.index);
// map name route with favcolor function
app.get('/name', home.name);
app.get('/favcolor', home.favcolor);
app.get('/sum/:a/:b', home.sum);
app.get('/drink/:name/:age', home.drink);
app.get('/product', math.product);

// START THINGS UP
// spin up server
var server = require('http').createServer(app);
server.listen(app.get('port'), function(){
  console.log('Node server listening. Port: ' + app.get('port'));
});

