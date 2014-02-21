/* global module, global, require */
/*jshint camelcase: false */
'use strict';

module.exports = Todo;
var todos= global.nss.db.collection('todos');
var Mongo = require('mongodb');

function Todo(todo){
  this._id = todo._id;
  this.name = todo.name || '';
  this.date = new Date(todo.date);
  this.isComplete = todo.isComplete || false;

  if (todo.tags instanceof Array){
    this.tags = todo.tags;
  }else if (todo.tags){
    this.tags = todo.tags.split(', ');
  }else{
    this.tags = [];
  }

  this.priority_id = todo.priority_id;
}

Todo.prototype.save = function(fn){
  todos.save(this, function(err, record){
    fn(err);
  });
};

Todo.findAll = function(fn, queryObj){
  if (!queryObj){
    todos.find().toArray(function(err, records){
      fn(records);
    });
  }else{
    var query = {};
    if (queryObj.tags){
      query.tag = queryObj.tags;
    }
    if (queryObj.limit){
      query.limit = queryObj.limit;
    }
    if (queryObj.page){
      query.skip = queryObj.skip;
    }

    todos.find({tags:{$in:[query.tag]}}).limit(query.limit).skip(query.skip).toArray(function(err, records){
      fn(records);
    });
  }
};

Todo.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  todos.findOne({_id:_id}, function(err, record){
    fn(record ? new Todo(record) : null);
  });
};

Todo.findByComplete = function(val, fn){
  todos.find({isComplete:val}).toArray(function(err, records){
    fn(records);
  });
};

Todo.findByPriority = function(val, fn){
  todos.find({priority_id:val}).toArray(function(err, records){
    fn(records);
  });
};

Todo.findByTag = function(tag, fn){
  todos.find({tags:{$in: [tag] }}).toArray(function(err, records){
    fn(records);
  });
};

Todo.deleteById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  todos.remove({_id:_id}, function(err, count){
    fn(count);
  });
};
