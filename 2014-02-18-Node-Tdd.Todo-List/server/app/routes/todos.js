/* global exports, global */
/*jshint camelcase: false */
'use strict';

var Todo;

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

/*
exports.update = function(req, res){
  init();

  Todo.findById(req.params.id, function(todo){
    todo.name = req.body.name;
    todo.date = req.body.date;
    todo.tags = req.body.tags;
    todo.priority_id = req.body.priority_id;

    todo.save(function(todo){
      console.log(todo);
      res.send(todo);
    });
  });
};
*/

exports.update = function(req, res){
  init();

  var todo = new Todo(req.body);
  todo.save(function(){
    res.send(todo);
  });
};

exports.destroy = function(req, res){
  init();

  Todo.deleteById(req.params.id, function(count){
    res.send({count:count});
  });
};

function init(){
  Todo = global.nss.Todo;
}

