/* jshint expr:true */
'use strict';

module.exports = Note;
var notes = global.nss.db.collection('notes');
var Mongo = require('mongodb');
var _ = require('lodash');

function Note(note){
  this.title = note.title;
  this.body = note.body;
  this.dateCreated = note.dateCreated ? new Date(note.dateCreated) : new Date();
  this.tags = note.tags.split(', ').map(function(n){return n.trim();});
  // _.compact creates an array with all falsey values removed
  this.tags = _.compact(this.tags);
  this.userId = Mongo.ObjectID(note.userId);
}

Note.prototype.insert = function(fn){
  notes.insert(this, function(err, record){
    fn(record[0]);
  });
};

Note.findByUserId = function(userId, fn){
  userId = Mongo.ObjectID(userId);
  notes.find({userId:userId}).toArray(function(err, records){
    fn(records);
  });
};

