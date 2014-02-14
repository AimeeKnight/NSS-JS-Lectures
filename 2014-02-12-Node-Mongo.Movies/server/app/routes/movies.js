'use strict';

var Movie = require('../models/movie');
var mongodb = require('mongodb');

exports.create = function(req, res){
  var db       = req.app.locals.db;
  var movies   = db.collection('movies');
  var movie;

  movie = new Movie(req.body);

  movies.insert(movie, function(err, records){
    res.send(records[0]);
  });
};

exports.index = function(req, res){
  var db       = req.app.locals.db;

  db.collection('movies').find().toArray(function(err, movies){
    res.send({movies:movies});
  });
};

exports.query = function(req, res){
  console.log(req.query);
  var db = req.app.locals.db;

  db.collection('movies').find(req.query).toArray(function(err, movies){
    res.send({movies:movies});
  });
};

exports.update = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  //var id = req.params.id;
  var id = new mongodb.ObjectID(req.params.id);
  var body = req.body;
  console.log('Updating body: ' + id);
  console.log(JSON.stringify(body));

  movies.update({_id: id}, body, function(err, result) {
    console.log('' + result + ' document(s) updated');
    res.send({ok:true});
  });
};

exports.destroy = function(req, res){
  var db = req.app.locals.db;
  var id = new mongodb.ObjectID(req.params.id);
  var movies = db.collection('movies');
  var query = {_id : id};

  movies.remove(query, function(err, count){
    res.send({deleted:count, id:req.params.id});
  });
};

