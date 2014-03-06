'use strict';

var Note = require('../models/note');
var Mongo = require('mongodb');
var moment = require('moment');

exports.index = function(req, res){
  Note.findByUserId(req.session.userId, function(notes){
    res.render('notes/index', {title:'All Notes', notes:notes, moment:moment});
  });
};

exports.new = function(req, res){
  console.log('USER ID', req.session.userId.toString());
  res.render('notes/new', {title:'New Note', userId:req.session.userId.toString()});
};

exports.create = function(req, res){
  //req.body.userId = req.session.userId;
  var note = new Note(req.body);
  note.userId = Mongo.ObjectID(req.session.userId);
  note.insert(function(){
    res.redirect('/notes');
  });
};

exports.destroy = function(req, res){
  Note.deleteById(req.params.id, function(){
    res.redirect('notes/index');
  });
};

exports.show = function(req, res){
  Note.findById(req.params.id, function(note){
    res.render('notes/show', {note:note});
  });
};
