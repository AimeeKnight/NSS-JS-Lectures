/* global global, require, module, console */
'use strict';

var MongoClient = require('mongodb').MongoClient;

module.exports = function(dbname, fn){
  var connection = 'mongodb://localhost/' + dbname;

  MongoClient.connect(connection, function(err, db) {
    if(err){throw err;}
    global.nss = {};
    global.nss.db = db;
    global.nss.Priority = require('../models/priority');
    global.nss.Todo = require('../models/todo');
    console.log('Connected to MongoDB; Models Loaded');
    fn();
  });
};

