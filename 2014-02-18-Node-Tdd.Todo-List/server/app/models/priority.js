/* global global, module */
/* jshint -W065 */
'use strict';

module.exports = Priority;
var priorities = global.nss.db.collection('priorities');

function Priority(priority){
  this.name = priority.name;
  this.value = parseInt(priority.value);
}

Priority.prototype.save = function(fn){
  priorities.save(this, function(err, record){
    fn(record);
  });
};

Priority.findAll = function(fn){
  priorities.find().toArray(function(err, records){
    fn(records);
  });
};

Priority.findByName = function(level, fn){
  priorities.findOne({name: level}, function(err, record){
    fn(new Priority(record));
  });
};
