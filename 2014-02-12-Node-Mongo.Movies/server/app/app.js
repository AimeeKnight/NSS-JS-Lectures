'use strict';

var dbname = 'imdb';
var port = process.env.PORT || 4000;

var d = require('./lib/request-debug');
var express = require('express');
var home = require('./routes/home');
var movies = require('./routes/movies');
var app = express();

/* --- pipeline begins */
/* --- vertical --- */
/* ensure connected to db */
app.use(require('./lib/mongodb-connection-pool').initialize(dbname, app));
/* ensure logging */
app.use(express.logger(':remote-addr -> :method :url [:status]'));
app.use(require('./lib/cors'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

/* --- horizontal --- */
app.get('/', d, home.index);
app.post('/movies', d, movies.create);
app.get('/movies', d, movies.index);
app.get('/movies/:name', movies.queryName);
/* --- pipeline ends   */

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Database: ' + dbname);
});

