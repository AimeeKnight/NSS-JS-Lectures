'use strict';

var Album = require('../models/album');

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

exports.index = function(req, res){
  Album.findAll(function(albums){
    console.log(albums);
    res.render('albums', {albums:albums});
  });
};
