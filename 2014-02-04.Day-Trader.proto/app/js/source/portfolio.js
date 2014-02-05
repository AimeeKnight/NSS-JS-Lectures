/* jshint unused:false*/
/*global Stock:false*/

var Portfolio = (function(){

  'use strict';

  function Portfolio(name){
    this.name = name;
    this._stocks = [];
  }
  
  Object.defineProperty(Portfolio.prototype, 'stockCount', {
    // define read only getter function ie instance.stockCount
    get: function(){return this._stocks.length;}
  });
  
  Portfolio.prototype.addStock = function(stocks){
    this._stocks = this._stocks.concat(stocks);
  };

  Portfolio.prototype.getStock = function(stockSymbols){
    var output;
    if (typeof stockSymbols === 'string'){
      output = findStock(stockSymbols, this._stocks);
    }else{
      output = _.map(stockSymbols, function(stockSymbol){
        return findStock(stockSymbol, this._stocks);
      }, this);
    }
    return output;
  };

  Portfolio.prototype.delStock = function(stockSymbols){
    var stocks = [].concat(stockSymbols);
    
    var output = _.remove(this._stocks, function(stock){
      return _.contains(stocks, stock.symbol);

    });
    if(typeof stockSymbols === 'string'){ output = output[0];}
    return output;
  };

  //// Private ////
  function findStock(symbol, stocks){
    return _.find(stocks, function(stock){
      return symbol === stock.symbol;
    });
  }

  return  Portfolio;
})();

