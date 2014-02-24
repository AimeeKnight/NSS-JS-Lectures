/* global exports */
/*jshint camelcase: false */
'use strict';

var User = require('../models/user');

exports.create = function(req, res){
  var user = new User(req.body);
  user.hash(function(){
    user.insert(function(user){
      res.send(user);
    });
  });
};
