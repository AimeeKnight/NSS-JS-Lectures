/* global global, module, require */
/*jshint camelcase: false */
/*jshint -W065 */
'use strict';

module.exports = User;
var bcrypt = require('bcrypt');
//var u1 = new User(req.body);
var users = global.nss.db.collection('users');
//var Mongo = require('mongodb');

// CREATE USER //
function User(user){
  this.email = user.email;
  this.password = user.password;
}

// HASH USER PASSWORD //
User.prototype.hash = function(fn){
  var that = this;
  // hash is the salted, hashed password
  bcrypt.hash(this.password, 8, function(err, hash){
    that.password = hash;
    fn();
  });
};

// SAVE USER //
User.prototype.insert = function(fn){
  var that = this;
  users.findOne({email:this.email}, function(err, user){
    if (!user){
      users.insert(that, function(err, records){
        //fn(records[0]);
        fn({success:true});
      });
    } else {
      fn({success:false});
    }
  });
};

/*
User.findByEmail = function(email, fn){
  users.findOne({email:email}, function(err, record){
    fn(record ? new User(record) : null);
  });
};
*/
