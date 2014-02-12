'use strict';

var Movie = require('../models/movie');

exports.create = function(req, res){
  console.log('create function');
  var db       = req.app.locals.db;
  var movies   = db.collection('movies');
  var movie;

  var name     = req.body.name;
  var rating   = req.body.rating;
  var length   = req.body.length;
  var year     = req.body.year;
  var studio   = req.body.studio;
  var actors   = req.body.actors;
  var director = req.body.director;
  var poster   = req.body.poster;

  actors = actors.split(',');

  movie = new Movie(name, rating, length, year, studio, actors, director, poster);

  movies.insert(movie, function(err, records){
    res.send(records[0]);
  });
};

