/*test( "name of test", function(){
  deepEqual( actual, expected, "my tests message" );
});*/

/*test("", function(){
  deepEquals(, , "");
});*/

test("add", function(){
  deepEqual(add(2,3), 5, "adding 2 and 3");
  deepEqual(add(2,-5), -3, "adding 2 and 3");
  deepEqual(add(0,0), 0, "adding 2 and 3");
});

test("sum", function(){
  deepEqual(sum([11,3,8]),22, "summing 11, 3 and 8");
});

test("countEvens",function(){
  deepEqual(countEvens([3,8,6,4,7]), 3, "should be 3 even values");
});

test("", function(){
  var actual = ['hello', 'cohort', 'iv', 'welcome', 'to', 'tdd']
  var expected = ['hello', 'COHORT', 'IV', 'welcome', 'TO', 'tdd']
  deepEqual(makeEvenStringsUppercase(actual), expected, "the returned array has even length words upper cased");
});

test("sumLengthOfStrings", function(){
  var strings = 'this is a very long string';
  deepEqual(sumLengthOfStrings(strings), 21, "string should be 21 characters (spaces joined)");
});
test("makeCatWithName", function(){
  deepEqual(makeCatWithName("fluffy").name, "fluffy", "cat's name should be fluffy");
});
