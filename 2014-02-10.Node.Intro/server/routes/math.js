'use strict';
// finds package, reads it in and puts it in the variable lodash
var _ = require('lodash');

exports.product = function(req, res){
  var numbers = req.query.numbers.split(', ');
  var prod = _.reduce(numbers, function(accumulator, num){
    return accumulator * num;
  }, 1);
  res.jsonp({product:prod});
};
