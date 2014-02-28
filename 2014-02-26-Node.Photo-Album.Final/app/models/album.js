'use strict';

module.exports = Album;
var fs = require('fs');
var path = require('path');
var albums = global.nss.db.collection('albums');
var Mongo = require('mongodb');

function Album(album){
  this._id = album._id ? Mongo.ObjectID(album._id) : null;
  this.title = album.title;
  this.taken = new Date(album.taken);
  this.cover = album.cover ? album.cover : '';
  this.photos = album.photos ? album.photos : [];
}

Album.prototype.addCover = function(oldpath){
  var dirname = this.title.replace(/\s/g, '').toLowerCase();
  var abspath = __dirname + '/../static';
  var relpath = '/img/' + dirname;
  fs.mkdirSync(abspath + relpath);

  var extension = path.extname(oldpath);
  relpath += '/cover' + extension;
  fs.renameSync(oldpath, abspath + relpath);

  this.cover = relpath;
};

Album.prototype.addPhoto = function(oldpath, name){
  var dirname = this.title.replace(/\s/g, '').toLowerCase();
  var abspath = __dirname + '/../static';
  var relpath = '/img/' + dirname + '/' + name;
  fs.renameSync(oldpath, abspath + relpath);

  this.photos.push(relpath);
};

Album.prototype.update = function(fn){
  console.log('THIS');
  console.log(this);
  albums.save(this, function(err, album){
    fn(album);
  });
};

Album.prototype.insert = function(fn){
  albums.insert(this, function(err, records){
    fn(err);
  });
};

Album.findAll = function(fn){
  albums.find().toArray(function(err, records){
    fn(records);
  });
};

Album.findById = function(id, fn){
  var _id = new Mongo.ObjectID(id);
  albums.findOne({_id:_id}, function(err, album){
    fn(album);
  });
};



