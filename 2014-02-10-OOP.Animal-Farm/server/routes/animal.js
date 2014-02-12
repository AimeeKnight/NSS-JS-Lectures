'use strict';

// capitalize variables sice we exported the constructor only
var Dog = require('../lib/dog');
var Cat = require('../lib/cat');

exports.create = function(req, res){
  var animal;
  var name = req.query.name;
  var gender = req.query.gender;
  var age = req.query.age;

  if (req.query.type === 'Dog'){
    animal = new Dog(name, gender, age);
  }else{
    animal = new Cat(name, gender, age);
  }
  res.jsonp({response:animal});
};


