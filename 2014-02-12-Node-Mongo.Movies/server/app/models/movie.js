'use strict';

module.exports = function (name, rating, length, year, studio, actors, director, poster){
  this.name = name;
  this.rating = parseInt(rating);
  this.length = parseInt(length);
  this.year = year;
  this.studio = studio;
  this.actors = actors;
  this.director = director;
  this.poster = poster;
};

