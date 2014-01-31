/* jshint unused: false */

var Client = (function(){

  'use strict';

  function Client(name){
    this.name = name;
    this.animals = [];
  }

  Client.prototype.adoptAnimal = function(animal){
    this.animals.push(animal);
  };

  return Client;
})();

