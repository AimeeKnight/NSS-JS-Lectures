/* jshint expr:true */
'use strict';

module.exports = Note;
//var _ = require('lodash');
//var notes = global.nss.db.collection('notes');
var Mongo = require('mongodb');
var _ = require('lodash');

function Note(note){
  this.title = note.title;
  this.body = note.body;
  this.dateCreated = note.dateCreated ? new Date(note.dateCreated) : new Date();
  this.tags = note.tags.split(', ').map(function(n){return n.trim();});
  this.tags = _.compact(this.tags);
  this.userId = Mongo.ObjectID(note.userId);
}
