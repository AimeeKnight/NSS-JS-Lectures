/* exported Cart */

var Cart = (function(){

  'use strict';

  function Cart(){
    this.products = [];
  }

  Object.defineProperty(Cart.prototype, 'total', {
    get: function (){
      var sum = _.reduce(this.products, function(total, product){
        return total + product.price;
      }, 0);
      return sum;
    }
  });

  Object.defineProperty(Cart.prototype, 'totalProducts', {
    get: function(){return this.products.length;}
  });

  Cart.prototype.add = function(product, qty){
    for(var i = 0; i < qty; i++){
      this.products.push(product);
    }
  };

  Cart.prototype.remove = function(product, qty){
    var that = this;
    for(var i = 0; i < qty; i++){
      var unwanted = _.indexOf(that.products, product);
      that.products.splice(unwanted, 1);
    }
  };


  return Cart;
})();


