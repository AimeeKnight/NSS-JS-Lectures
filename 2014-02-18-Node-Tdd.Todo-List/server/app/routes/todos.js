/* global exports, global */
/*jshint camelcase: false */
'use strict';

var Todo;
var Mongo = require('mongodb');

exports.create = function(req, res){
  init();

  var todo = new Todo(req.body);
  todo.save(function(){
    res.send(todo);
  });
};

exports.index = function(req, res){
  init();

  Todo.findAll(function(todos){
    res.send({todos:todos});
  });
};

exports.show = function(req, res){
  init();

  Todo.findById(req.params.id, function(todo){
    res.send(todo);
  });
};

exports.update = function(req, res){
  init();

  var id = new Mongo.ObjectID(req.params.id);
  var name = req.body.name;
  var date = req.body.date;
  var isComplete = req.body.isComplete;
  var tags = req.body.tags;
  var priority_id = req.body.priority_id;
  var todo = new Todo({_id:id, name:name, date:date, isComplete:isComplete, tags:tags, priority_id:priority_id});
  todo.save(function(){
    res.send(todo);
  });
};

/*
exports.update = function(req, res){
  init();

  var todo = new Todo(req.body);
  todo.save(function(){
    res.send(todo);
  });
};
*/

exports.destroy = function(req, res){
  init();

  Todo.deleteById(req.params.id, function(count){
    res.send({count:count});
  });
};

function init(){
  Todo = global.nss.Todo;
}

