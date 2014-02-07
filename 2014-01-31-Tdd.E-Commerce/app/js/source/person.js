/* exported Person */
/* global Cart:false */

var Person = (function(){

  'use strict';

  function Person(name, cash){
    this.name = name;
    this.cash = cash;
    this.cart = new Cart();
  }

  Person.prototype.checkOut = function(){
    var receipt;

    if(this.cash - this.cart.total >= 0){
      receipt = _.map(this.cart.products, function(product){
        return product.name;
      });
      receipt = receipt.join(', ');
      this.cash -= this.cart.total;
      this.cart.products = [];
    }

    return receipt;
  };

  return Person;
})();
