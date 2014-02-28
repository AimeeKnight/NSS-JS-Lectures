'use strict';

var Album = require('../models/album');
var moment = require('moment');

exports.index = function(req, res){
  Album.findAll(function(albums){
    res.render('albums/index', {moment:moment, albums:albums, title:'Photo Albums'});
  });
};

exports.new = function(req, res){
  res.render('albums/new', {title:'New Album'});
};

exports.create = function(req, res){
  var album = new Album(req.body);
  album.addCover(req.files.cover.path);
  album.insert(function(){
    res.redirect('/');
  });
};

exports.show = function(req, res){
  var id = req.params.id;
  Album.findById(id, function(album){
    res.render('albums/show', {moment:moment, album:album, title:album.title});
  });
};

//exports.addPhoto = function(req, res){};
//req.params.id;
//req.files.alpha.path;

