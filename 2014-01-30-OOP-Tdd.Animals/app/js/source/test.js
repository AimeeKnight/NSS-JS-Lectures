/* global ok, deepEqual, Shelter, Animal, Client, test: false */

'use strict';
test('Shelter', function() {
  var shelter = new Shelter();
  var s1 = new Shelter();
  var string = 'my string';

  ok( shelter instanceof Shelter, 'Shelter should be an instance of shelter' );
  ok( s1 instanceof Shelter, ' s1 should be an instance of Shelter');
  ok( !(string instanceof Shelter), ' string should not be an instance of Shelter');
});

//test creation of a name property
test('Shelter#name', function() {
  var s1 = new Shelter('Green Hills Shelter');

  deepEqual(s1.name, 'Green Hills Shelter','s1 Should have a name');
});

test('Shelter#location', function() {
  var s1 = new Shelter('Green Hills Shelter');
  s1.location = 'Main St';
  var s2 = new Shelter ('GHS');

  deepEqual(s1.location, 'Main St','s1 should have a location');
  deepEqual(s2.location, 'Not Defined','s2 should have a default location');
});

test('Shelter#capacity', function() {
  var s1 = new Shelter('Green Hills Shelter');

  deepEqual(s1.capacity, 0,'s1 should have a zero capacity');
});

test('Shelter#setHours', function() {
  var s1 = new Shelter('Green Hills Shelter');
  s1.setHours([
    {day:'Mon', open:'8am', close: '5pm'},
    {day:'Wed', open:'11am', close: '2pm'},
    {day:'Fri', open:'9am', close: '4pm'}
  ]);

  deepEqual(s1.hours, 'Mon 8am-5pm, Wed 11am-2pm, Fri 9am-4pm', 's1 should have hours set');
});

test('Shelter#addAnimal', function(){
  var s1 = new Shelter('Green Hills Shelter');
  var a1 = new Animal('Fido');
  s1.addAnimal(a1);

  ok(s1.animals.length === 1, 's1 will contain one animal');
  ok(s1.animals[0] instanceof Animal, 's1\'s animal should be an instance of Animal');
  ok(s1.animals[0].name, 'Fido', 's1\'s animal should be an instance of Animal');
});

test('Shelter#addAnimal', function(){
  var s1 = new Shelter('Green Hills Shelter');
  var a1 = new Animal('Fido');
  var a2 = new Animal('Max');
  var a3 = new Animal('Buddy');
  s1.addAnimal(a1);
  s1.addAnimal(a2);
  s1.addAnimal(a3);
  var a4 = s1.placeAnimal('Fido');

  deepEqual(s1.animals.length, 2, 's1 will contain two animal');
  deepEqual(a4.name, 'Fido', 's1\'s animal should be an instance of Animal');
});

test('Animal', function() {
  var a1 = new Animal();

  ok( a1 instanceof Animal, 'a1 is an instance of animal');
});

test('Animal#name', function() {
  var a1 = new Animal('Fido');

  deepEqual(a1.name, 'Fido', 'a1 should be named Fido');
});

test('Animal#species', function() {
  var a1 = new Animal('Fido', 'Dog');
  var a2 = new Animal('Fido');

  deepEqual(a1.species, 'Dog', 'a1 should be a Dog');
  deepEqual(a2.species, 'Not Set', 'a2\'s species should not be set');
});

test('Animal#gender', function() {
  var a1 = new Animal('Fido', 'Dog', 'Male');
  var a2 = new Animal('Fido');

  deepEqual(a1.gender, 'Male', 'a1 should be a Male');
  deepEqual(a2.gender, 'Not Set', 'a2\'s gender should not be set');
});

test('Animal#age', function() {
  var a1 = new Animal('Fido', 'Dog', 'Male', 3);
  var a2 = new Animal('Fido');

  deepEqual(a1.age, 3, 'a1 should be 3');
  deepEqual(a2.age, 0, 'a2\'s age should be 0');
});

test('Client#adoptAnimal', function(){
  var s1 = new Shelter('Green Hills Shelter');
  var a1 = new Animal('Fido');
  var c1 = new Client('Aimee');
  s1.addAnimal(a1);
  var a4 = s1.placeAnimal('Fido');
  c1.adoptAnimal(a4);

  ok(c1.animals.length === 1, 'c1 should have a single animal adopted');
  ok(c1.animals[0].name === 'Fido', 'c1 should have an animal named Fido');
});
