/* global exports */
/*jshint camelcase: false */
'use strict';

var User = require('../models/user');

exports.create = function(req, res){
  var user = new User(req.body);
  user.hash(function(){
    user.insert(function(user){
      if (user){
        res.send({isSuccess:true});
      }else{
        res.send({isSuccess:false});
      }
    });
  });
};

exports.show = function(req, res){

  User.findByEmail(req.params.id, function(user){
    res.send(user);
  });
};

exports.login = function(req, res){
  res.send({login:true});
};

