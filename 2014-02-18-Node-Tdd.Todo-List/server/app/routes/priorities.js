/* global exports, global, require */
'use strict';

var Priority;
var Mongo = require('mongodb');

exports.create = function(req, res){
  init();

  var priority = new Priority(req.body);
  priority.save(function(){
    res.send(priority);
  });
};

exports.index = function(req, res){
  init();

  Priority.findAll(function(priorities){
    res.send({priorities:priorities});
  });
};

exports.show = function(req, res){
  init();

  Priority.findById(req.params.id, function(priority){
    res.send(priority);
  });
};

exports.update = function(req, res){
  init();

  var id = new Mongo.ObjectID(req.params.id);
  var name = req.body.name;
  var value = req.body.value;
  var p1 = new Priority({_id:id, name:name, value:value});
  p1.save(function(){
    res.send(p1);
  });
};

exports.destroy = function(req, res){
  init();

  Priority.deleteById(req.params.id, function(count){
    res.send({count:count});
  });
};

function init(){
  Priority = global.nss.Priority;
}

