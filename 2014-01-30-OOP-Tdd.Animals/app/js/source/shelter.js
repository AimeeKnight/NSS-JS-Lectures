/* jshint unused: false */

var Shelter = (function(){

  'use strict';

  var hours;
  var animals = [];

  function Shelter(x){
    this.name = x;
    this.location = 'Not Defined';
    this.capacity = 0;
  }

  Shelter.prototype.setHours = function(week){
      var weekStr = _.map(week, function(ea){
        return ea.day + ' ' + ea.open + '-' + ea.close;
      });
      // hours is a closure that can only be accessed via setHours()
      // hours is now a global viarable rather than a property
      hours = weekStr.join(', ');
    };

  Shelter.prototype.addAnimal = function(animal){
    animals.push(animal);
  };

  Shelter.prototype.placeAnimal = function(name){
    var tmpAnimals = _.remove(animals, function(animal){
      return animal.name === name;
    });
    return tmpAnimals[0];
  };

  Shelter.prototype.getHours = function(){
    return hours;
  };

  Shelter.prototype.animalCount = function(){
    return animals.length;
  };

  return Shelter;
})();


