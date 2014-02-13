'use strict';

var Movie = require('../models/movie');

exports.create = function(req, res){
  var db       = req.app.locals.db;
  var movies   = db.collection('movies');
  var movie;

  //var name     = req.body.name;
  //var rating   = req.body.rating;
  //var length   = req.body.length;
  //var year     = req.body.year;
  //var studio   = req.body.studio;
  //var actors   = req.body.actors;
  //var director = req.body.director;
  //var poster   = req.body.poster;

  //movie = new Movie(name, rating, length, year, studio, actors, director, poster);
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

exports.queryName = function(req, res){
  var db       = req.app.locals.db;
  var query = {};
  query.name = req.params.name;
  console.log('query');
  console.log(query);

  db.collection('movies').find(query).toArray(function(err, movies){
    res.send({movies:movies});
  });
};
