/* exported Client */

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


