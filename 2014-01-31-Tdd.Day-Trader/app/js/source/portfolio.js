/* jshint unused:false */

var Portfolio;

function portfolioFactory(name){

  'use strict';

  var stocks = [];

  function PortfolioFn(name){
    this.name = name;
  }

  Portfolio = PortfolioFn;

  Portfolio.prototype.stockCount = function(){
    return stocks.length;
  };

  Portfolio.prototype.addStock = function(stock){
    stocks.push(stock);
  };

  Portfolio.prototype.removeStock = function(symbol){
    var tmpStocks = _.remove(stocks, function(stock){
      return stock.getSymbol() === symbol;
    });
    return tmpStocks[0];
  };

  return new Portfolio(name);
}

