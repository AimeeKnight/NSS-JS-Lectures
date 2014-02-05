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
    /*this._stocks.push(stocks);
    this._stocks = _.flatten(this._stocks);
    
    var that = this;
    if(stocks instanceof Stock){
      this._stocks.push(stocks);
    }else{
      stocks.forEach(function(stock){
        that._stocks.push(stock);
      });
    }

  Portfolio.prototype.getStock = function(stockSymbol){
    var tempStocks = [], that = this, matches = [], match;
    tempStocks.push(stockSymbol);
    tempStocks = _.flatten(tempStocks);

    _.forEach(tempStocks, function(stockSymbol){
      var  match  = _.where(that._stocks, {'symbol': stockSymbol });
      matches.push(match);
    });

    matches = _.flatten(matches);
    if(matches.length < 2){
      return matches[0];
    }else{
      return matches;
    }
  };
  */

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
    if(typeof stockSymbols === 'string'){
      output = output[0];
    }
    return output;
  };
/*
  Portfolio.prototype.delStock = function(stockSymbols){
    //var stocks = [].concat(stockSymbols);
    var output;
    debugger;
    if (typeof stockSymbols === 'string'){
      output = removeStock(stockSymbols, this._stocks);
      output = output[0];
    }else{
      output = _.map(stockSymbols, function(stockSymbol){
        return removeStock(stockSymbol, this._stocks);
      }, this);
    }
    return output;

  };
*/
  //// Private ////
  function findStock(symbol, stocks){
    return _.find(stocks, function(stock){
      return symbol === stock.symbol;
    });
  }
  function removeStock(symbol, stocks){
    return _.remove(stocks, function(stock){
      return symbol === stock.symbol;
    });
  }

  return  Portfolio;
})();

