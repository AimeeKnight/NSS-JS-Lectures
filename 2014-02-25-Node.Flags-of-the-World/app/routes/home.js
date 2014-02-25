'use strict';

var _ = require('lodash');

exports.index = function(req, res){
  var random = _.random(2, 4);
  var flags = _.sample(global.flags, random);
  var shuffledFlags = _.shuffle(flags);
  res.render('home/index', {flags:flags, shuffledFlags:shuffledFlags, title: 'Flags of the World'});
};

exports.match = function(req, res){
  var countryName = req.query.countryName;
  var flagCode = req.query.flagCode;
  console.log(flagCode);
  console.log(countryName);

  var match = _.find(global.flags, function(flag){
    return flag.country === countryName && flag.flag === flagCode;
  });
  console.log(match);

  res.send({match:!!match});
};

