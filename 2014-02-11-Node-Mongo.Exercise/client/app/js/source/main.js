(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    getExercises();
    $('#create-exercise').click(createExercise);
    $('#filter-exercise').click(filterExercise);
  }

  function getExercises(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/exercises';
    $.getJSON(url, displayExercises);
  }

  function displayExercises(data){
    $('#exercises > tbody').empty();
    for(var i = 0; i < data.exercises.length; i++){
      var $name = $('<td class="name"></td>');
      var $time = $('<td>');
      var $cals = $('<td>');
      var $date = $('<td>');

      $name.text(data.exercises[i].name);
      $time.text(data.exercises[i].time);
      $cals.text(data.exercises[i].calories);
      $date.text(data.exercises[i].date);

      var $row = $('<tr class="'+data.exercises[i].name+'"></tr>');

      $row.append($name, $time, $cals, $date);
      $('#exercises > tbody').prepend($row);
    }
    populateDropDown();
  }

  function populateDropDown(){
    var $names = $('.name');
    var nameString = _.map($names, function(name){
      return $(name).text();
    });

    var uniqueNames = _.uniq(nameString);
    _.forEach(uniqueNames, function(name){
      var $option = $('<option value="'+name+'"></option>');
      $option.text(name);
      $('#drop-down').append($option);
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

  function filterExercise(){
    var $trHead = $('#head');
    var selected = $('#drop-down option:selected').text();
    $('tr').each(function(index, element){
      $(element).show();
      if (!$(element).hasClass(selected)){
        $(element).hide();
      }
      $trHead.show();
    });
  }

})();

