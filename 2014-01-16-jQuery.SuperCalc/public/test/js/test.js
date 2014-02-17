/*test( "name of test", function(){
  deepEqual( actual, expected, "my tests message" );
});*/

/*test("", function(){
  deepEqual(, , "");
});*/

test('containsChar', function(){
  deepEqual(containsChar('mouse', 'u'),true,"the letter 'u' should be in mouse");
});
test('containsChar', function(){
  deepEqual(containsChar('mouse', 'z'),false,"the letter 'z' should be in mouse");
});
