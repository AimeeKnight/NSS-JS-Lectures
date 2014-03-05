'use strict';

module.exports = function(req, res, next){
  var User = require('../models/user');

  User.findOne(req.session.userId, function(foundUser){
    res.locals.user = foundUser;
    console.log('FOUND USER');
    console.log(foundUser);

    next();
  });
};

