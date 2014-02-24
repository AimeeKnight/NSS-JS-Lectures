/* global module, global, require */
/*jshint camelcase: false */
/*jshint -W065 */
'use strict';

module.exports = Todo;
var todos= global.nss.db.collection('todos');
var Mongo = require('mongodb');

function Todo(todo){
  this._id = todo._id;
  this.name = todo.name || '';
  this.date = new Date(todo.date);

  if (todo.isComplete === 'on'){
    this.isComplete = true;
  }else{
    this.isComplete = false;
  }

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

Todo.findAll = function(fn, data){
  if (!data){
    todos.find().toArray(function(err, records){
      fn(records);
    });
  }else{
    var page, sort, limit;
    var query = {};
    if(data.tags){
      query.tags = data.tags;
    }
    if(data.priorityId){
      query.priorityId = new Mongo.ObjectID(data.priorityId);
    }
    if(data.page){
      page = parseInt(data.page);
    }
    if(data.limit){
      limit=parseInt(data.limit);
    }

    var skip = limit*(page-1);

    if(data.sort){
      sort=[[data.sort, data.order]];
    }

    todos.find(query).sort(sort).skip(skip).limit(limit).toArray(function(err, records){
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
    fn({todos:records});
  });
};

Todo.findByPriority = function(val, fn){
  todos.find({priority_id:val}).toArray(function(err, records){
    fn({todos:records});
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
