/* jshint unused: false */

var Shelter = (function(){

  'use strict';

  function Shelter(x){
    this.name = x;
    this.location = 'Not Defined';
    this.capacity = 0;
    this.animals = [];
  }

  Shelter.prototype.setHours = function(week){
      var weekStr = _.map(week, function(ea){
        return ea.day + ' ' + ea.open + '-' + ea.close;
      });

      this.hours = weekStr.join(', ');
    };

  Shelter.prototype.addAnimal = function(animal){
    this.animals.push(animal);
  };

  Shelter.prototype.placeAnimal = function(name){
    var animals = _.remove(this.animals, function(animal){
      return animal.name === name;
    });
    return animals[0];
  };

  return Shelter;
})();


