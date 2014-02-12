'use strict';

function Exercise(name, time, calories, date){
  this.name = name;
  this.time = parseInt(time);
  this.calories = parseInt(calories);
  this.date = date;
}

module.exports = Exercise;
