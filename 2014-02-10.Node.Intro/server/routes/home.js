'use strict';

// function called index takes in request from browser and
// res is the response from server that will be built up as JSON
exports.index = function(req, res){
// req and res are only on the server so they never hit the browser
  res.jsonp({ok:true});
};

exports.name = function(req, res){
  res.jsonp({name:'this is node'});
};

exports.favcolor = function(req, res){
  res.jsonp({favcolor:'fav color is green'});
};

exports.sum = function(req, res){
  var total = parseFloat(req.params.a) + parseFloat(req.params.b);
  res.jsonp({sum:total});
};

exports.drink = function(req, res){
  var name = req.params.name;
  var age = parseFloat(req.params.age);

  if (age <= 17){
    res.jsonp({answer: name + ' can\'t drink'});
  }else if (age >= 18 && age <= 20){
    res.jsonp({answer: name + ' might drink'});
  }else{
    res.jsonp({answer: name + ' can drink'});
  }
};
