'use strict';

module.exports = Album;
var fs = require('fs');
var path = require('path');
var albums = global.nss.db.collection('albums');
var Mongo = require('mongodb');

function Album(album){
  this._id = album._id ? Mongo.ObjectID(album._id) : null;
  this.title = album.title;
  this.taken = album.taken ? new Date(album.taken) : null;
}

Album.prototype.addCover = function(oldpath){
  // app/static/img/eurovacation/cover.jpg
  var dirname = this.title.replace(/\s/g, '').toLowerCase();
  var newpath = __dirname + '/../static/img/' + dirname;
  fs.mkdirSync(newpath);

  var extension = path.extname(oldpath);
  newpath += '/cover' + extension;
  fs.renameSync(oldpath, newpath);

  this.cover = path.normalize(newpath);
};

Album.prototype.insert = function(title, fn){
  var self = this;

  albums.findOne({title:this.title}, function(err, album){
    if(!album){
      albums.insert(self, function(err, records){
        fn(records[0]);
      });
    }else{
      fn(null);
    }
  });
};
