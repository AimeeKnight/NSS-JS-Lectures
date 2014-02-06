/* exported Client */
/* global Stock */

var Client = (function(){

  'use strict';

  function Client(name, cash ){
    this.name = name;
    this._portfolios = [];
    this.cash = cash;
  }

  Object.defineProperty(Client.prototype, 'portfolioCount', {
    // define read only getter function ie instance.portfolioCount
    get: function(){return this._portfolios.length;}
  });

  Client.prototype.addPortfolio = function(portfolios){
    this._portfolios = this._portfolios.concat(portfolios);
  };

  /*
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
  */

  Client.prototype.getPortfolios = function(portfolioNames){
    var portfolios = [].concat(portfolioNames);

    var output = _.filter(this._portfolios, function(portfolio){
      return _.contains(portfolios, portfolio.name);
    });

    // if getPortfolios is passd a string
    // return portfolio object rather than array of portfolios
    // since output will only have one element
    if(typeof portfolioNames === 'string'){ output = output[0]; }
    return output;
  };

  Client.prototype.delPortfolios = function(portfolioNames){
    var portfolios = [].concat(portfolioNames);

    var output = _.remove(this._portfolios, function(portfolio){
      return _.contains(portfolios, portfolio.name);
    });

    if(typeof portfolioNames === 'string'){ output = output[0]; }
    return output;
  };

  Client.prototype.purchaseStock = function(symbol, shares, innerCallback){
    var that = this;
    var stock, total;
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+symbol+'&callback=?';
    $.getJSON(url, function(quote){
      total = quote.LastPrice * shares;

      if (that.cash - total >= 0){
        stock = new Stock(symbol, shares, quote.LastPrice);
        that.cash -= total;
      }
      // call the function our API user will be passing in to purchaseStock
      // passing in the stock created when the request comes back 
      innerCallback(stock);
    });
  };

  Client.prototype.sellStock = function(stock, amount, innerCallback){
    var that = this;
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+stock.symbol +'&callback=?';
    $.getJSON(url, function(quote){
      if(amount <= stock.shares){
        var total = quote.LastPrice * amount;
        that.cash += total;
        stock.shares -= amount;
      }
      // call the function our API user will be passing in to purchaseStock
      // passing in the stock created when the request comes back 
      innerCallback(stock);
    });
  };

  //// Private ////
  /*
  function findPortfolio(name, portfolios){
    return _.find(portfolios, function(portfolio){
      return name === portfolio.name;
    });
  }
  */

  return  Client;
})();


