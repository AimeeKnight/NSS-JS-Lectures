/* jshint unused:false*/
/*global Stock:false*/

var Client = (function(){

  'use strict';

  function Client(name){
    this.name = name;
    this._portfolios = [];
  }
  Object.defineProperty(Client.prototype, 'portfolioCount', {
    // define read only getter function ie instance.portfolioCount
    get: function(){return this._portfolios.length;}
  });

  Client.prototype.addPortfolio = function(portfolios){
    this._portfolios = this._portfolios.concat(portfolios);
  };

  Client.prototype.getPortfolios = function(portfolioNames){
    var output;
    if (typeof portfolioNames === 'string'){
      output = findPortfolio(portfolioNames, this._portfolios);
    }else{
      output = _.map(portfolioNames, function(portfolioName){
        return findPortfolio(portfolioName, this._portfolios);
      }, this);
    }
    return output;
  };

  Client.prototype.delPortfolios = function(portfolioNames){
    var portfolios = [].concat(portfolioNames);
    
    var output = _.remove(this._portfolios, function(portfolio){
      return _.contains(portfolios, portfolio.name);

    });
    if(typeof portfolioNames === 'string'){
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
  function findPortfolio(name, portfolios){
    return _.find(portfolios, function(portfolio){
      return name === portfolio.name;
    });
  }
/*
  function removeStock(symbol, stocks){
    return _.remove(stocks, function(stock){
      return symbol === stock.symbol;
    });
  }
*/
  return  Client;
})();


