/* exported Cart */

var Cart = (function(){

  'use strict';

  function Cart(){
    this.products = [];
  }

  Object.defineProperty(Cart.prototype, 'total', {
    get: function(){
      var sum =  _.reduce(this.products, function(accumulator, product){
        return accumulator + product.price;
      }, 0);

      return Math.round(sum) || 0;
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

  /*
  Cart.prototype.remove = function(name, quantity){
    var removed = _.remove(this.products, function(product){
      return product.name === name;
    });

    for(var i = 0; i < quantity; i++){
      removed.pop();
    }

    this.products = this.products.concat(removed);
  };
  */

  return Cart;
})();


