/* global Person:false, Cart:false, Product:false,  test:false, ok:false, deepEqual:false */

'use strict';

// -------------------- Person -------------------- //

test('Person#new', function(){
  var r1 = new Person('Bob', 100);

  ok(r1 instanceof Person, 'r1 is a Person');
  deepEqual(r1.name, 'Bob', 'r1 is named Bob');
  ok(r1.cart instanceof Cart, 'r1.cart is a Cart');
});

test('Cart#checkOut', function(){
  var r1 = new Person('Bob', 100);
  var p1 = new Product('CD', 10);

  r1.cart.add(p1, 2);
  r1.checkOut();
  
  ok(r1.cash, 80, 'r1 will have $80');
  deepEqual(r1.cart.totalProducts, 0, 'r1 will not have have any products in their cart');
});

// -------------------- Cart -------------------- //

test('Cart#new', function(){
  var c1 = new Cart();

  ok(c1 instanceof Cart, 'c1 is a Cart');
});

test('Cart#add', function(){
  var r1 = new Person('Bob', 100);
  var p1 = new Product('CD', 10);
  
  r1.cart.add(p1, 2);

  deepEqual(r1.cart.products[0].name, 'CD', 'A CD was added to the cart');
  deepEqual(r1.cart.products.length, 2, 'r1 should have two product in it');
});

test('Cart#remove', function(){
  var r1 = new Person('Bob', 100);
  var p1 = new Product('CD', 10);
  
  r1.cart.add(p1, 2);
  r1.cart.remove(p1, 1);

  deepEqual(r1.cart.products[0].name, 'CD', 'A CD was added to the cart');
  deepEqual(r1.cart.totalProducts, 1, 'r1 should have two product in it');
});


test('Cart#total', function(){
  var r1 = new Person('Bob', 100);
  var p1 = new Product('CD', 10);

  r1.cart.add(p1, 2);
  
  deepEqual(r1.cart.total, 20, 'The total in the cart should be $20');
});


// -------------------- Product -------------------- //

test('Products#new', function(){
  var p1 = new Product('CD', 10);

  ok(p1 instanceof Product, 'p1 is a Product');
  deepEqual(p1.name, 'CD', 'p1 is named CD');
  deepEqual(p1.price, 10, 'p1 is named $10');
});
