/* exported Stock */

var Stock = (function(){

  'use strict';

  function Stock(symbol, shares, purchaseAmount){
    this._symbol = symbol;
    this._shares = shares;
    this._purchaseAmount = purchaseAmount;
  }

  Object.defineProperty(Stock.prototype, 'symbol', {
    // define read only getter function ie instance.symbol
    get: function(){return this._symbol;}
  });
  
  Object.defineProperty(Stock.prototype, 'shares', {
    // define read only getter function ie instance.shares
    get: function(){return this._shares;}
  });

  Object.defineProperty(Stock.prototype, 'purchaseAmount', {
    // define read only getter function ie instance.purchaseAmount
    get: function(){return this._purchaseAmount;}
  });

  // the instance calling value will provide value with a function
  // to call when the data comes back
  Stock.prototype.value = function(fn){
    var that = this;
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+that.symbol+'&callback=?';
    $.getJSON(url, function(quote){
      var total = quote.LastPrice * that.shares;
      fn(total);
    });
  };

  return Stock;
})();
