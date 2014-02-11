'use strict';

var Stock = require('../lib/stock');

exports.create = function(req, res){
  var stock;
  var price = Math.floor(Math.random()*1001);
  stock = new Stock(req.query.symbol, price);

  res.jsonp({response:stock});
};
