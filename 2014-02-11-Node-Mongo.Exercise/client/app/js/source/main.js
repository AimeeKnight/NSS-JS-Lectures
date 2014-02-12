(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    getExercises();
    $('#create-exercise').click(createExercise);
  }

  function getExercises(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/exercises';
    $.getJSON(url, displayExercises);
  }

  function displayExercises(data){
    console.log(data);
    _.forEach(data.exercises, function(x){
      var name = x.name;
      var time = x.time;
      var calories = x.calories;
      var date = x.date;

      console.log(name);
      console.log(time);
      console.log(calories);
      console.log(date);

      var $tr = $('<tr></tr>');
      var $tdName = $('<td></td>').text(name);
      var $tdTime = $('<td></td>').text(time);
      var $tdCalories = $('<td></td>').text(calories);
      var $tdDate = $('<td></td>').text(date);

      $tr.append($tdName, $tdTime, $tdCalories, $tdDate);
      $('#exercises > tbody').prepend($tr);
    });
  }

  function createExercise(){
    var name = $('#name').val();
    var time = $('#time').val();
    var cals = $('#cals').val();
    var date = $('#date').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/exercises';
    var options = {};
    options.url = url;
    options.type = 'POST';
    options.data = {name:name, time:time, calories:cals, date:date};
    options.success = exerciseCreated;
    $.ajax(options);
  }

  function exerciseCreated(){
    $('#exercises > tbody').empty();
    getExercises();
  }

})();

