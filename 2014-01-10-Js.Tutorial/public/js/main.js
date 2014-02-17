// single line comment
/* multi
 * line
 * comment */

document.write('we are javascript');
console.log('Aimee Knight');
console.log('hello from javascript');

//debugger

var a = 10;
var b = 20;
var c = a + b;
var d = c * b;
var e = d * (b - a);

console.log('e is ' + e);

var power = Math.pow(2, 8);
console.log('2 to the 8th power is '+ power);

// example
// you have a room that is 8ft by 12ft
// write the code that will compute the area of
// the room and pring that out to the console

var width = 8;
var height = 12;
var area = width * height;
console.log('the area of a room that\'s 8ft by 12ft is '+ area + ' square feet');

// example
// you have a cylinder with a radius that\'s 5 inches and has a height of 9 inches
// what is the volume in cubic inches

var radius = 5;
var height = 9;
var circleArea = Math.PI * Math.pow(radius, 2);
var circleVolume = circleArea * height;
console.log('the area of a 5in radius cyclinder, 9 inches high is ' + circleVolume);

// you are a floor painter
// you have an exceptionally large bucket of paint
// you can paint up to 29,572 square feet of surface without having to refill.
// every house you encounter has 3 rooms. Here are the dimensions.
// 3 x 5
// 7 x 9
// 6 x 2
// how many houses can you paint before running out of paint 

var room1 = 3 * 5;
var room2 = 7 * 9;
var room3 = 6 * 2;
var paint = 29572;
var areaPerHouse = room1 + room2 + room3;
var houses = paint / areaPerHouse;
console.log('You can paint ' + Math.floor(houses) + ' houses');

// you are a spaceman with lazers
// you can travel the speed of light
// you are in the andromeda galexy, somewhere
// you want to destroy justin bieber
// if you leave as soon as tomorrow
// when will you arrive to meet the bieb.
// i.e., how many days will it take you to get here
// please hurray!

var galLightYearsToEarth = 2538000;
var daysPerYear = 365 * galLightYearsToEarth;
console.log('It will take you ' + daysPerYear + ' days to reach the bieb');

//var firstName = prompt('Enter your first name');
//var lastName = prompt('Enter your last name');
//console.log('your full name is ' + firstName + ' ' + lastName);

//var l = prompt('Enter the length of your room');
//l = pareseInt(l);

//var l = prompt('Enter the length of your room');
//var w = prompt('Enter the width of your room');
//var h = prompt('Enter the height of your room');
//l = pareseInt(l);
//w = pareseInt(w);
//h = pareseInt(h);
//area = l * w * h;
//console.log('The area of your room is ' + area);

var age = prompt('what is you age?');
age = parseInt(age);
if(age < 18)
  console.log('You can\'t vote');
else
  console.log('You can vote');



