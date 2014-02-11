'use strict';
var MongoClient = require('mongodb').MongoClient;
var Exercise = require('../models/exercise');

exports.create = function(req, res){

  MongoClient.connect('mongodb://localhost/gym', function(err, db) {
    if(err) {throw err;}
    console.log('Connected to Database');

    var exercise  = new Exercise(req.body.name, req.body.time, req.body.calories, req.body.date);

    db.collection('exercises').insert(exercise, function(err, exercises){
      res.send(exercises[0]);
    });
  });

  //res.jsonp({response:true});
};
