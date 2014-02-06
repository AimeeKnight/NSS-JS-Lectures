/* global start, stockFactory, Portfolio,  portfolioFactory, asyncTest, ok, deepEqual, test, Stock: false */

'use strict';

test('Stock#new', function() {
  var s1 = stockFactory('AAPL', 50, 25)  ;
  s1.symbol = 'NULL';
  s1.shares = 'NULL';
  s1.purchaseAmount = 'NULL';

  ok(s1 instanceof Stock, 's1 should be an instance of Stock');
  deepEqual(s1.getSymbol(), 'AAPL', 's1 should have a of AAPL');
  deepEqual(s1.getShares(), 50, 's1 should have 50 shares');
  deepEqual(s1.getPurchaseAmount(), 25, 's1 should be purchased at $25');
});

asyncTest('Stock#currentPrice', function() {
  var s1 = stockFactory('AAPL', 50, 25)  ;
  s1.getQuote(function(quote){
    ok(quote.LastPrice > 0, 'AAPL quote should be greater than 0');
    start();
  });
});

asyncTest('Stock#value', function() {
  var s1 = stockFactory('AAPL', 50, 25)  ;
  s1.value(function(value){
    ok(value > 0, 'AAPL total value should be greater than 0');
    start();
  });
});

test('Portfolio#new', function() {
  var p1 = portfolioFactory('Tech Stocks');

  ok(p1 instanceof Portfolio, 'p1 is an instance of Portfolio');
  deepEqual(p1.name,'Tech Stocks', 'p1 should have a name');
});

test('Portfolio#addStock', function() {
  var p1 = portfolioFactory('Tech Stocks');
  var s1 = stockFactory('AAPL', 50, 25)  ;
  p1.addStock(s1);

  deepEqual(p1.stockCount(), 1, 'p1 has one stock in it');
});

test('Portfolio#removeStock', function() {
  var p1 = portfolioFactory('Tech Stocks');
  var s1 = stockFactory('AAPL', 50, 25);
  var s2 = stockFactory('AMZN', 40, 30);
  var s3 = stockFactory('LUV', 60, 40);

  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock(s3);

  var s4 = p1.removeStock('AAPL');

  deepEqual(s4.getSymbol(), 'AAPL', 'the deleted stock should be AAPL');
  deepEqual(p1.stockCount(), 2, 'p1 should have two stocks');
});
