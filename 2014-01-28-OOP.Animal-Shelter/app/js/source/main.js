(function(){
  /* global Animal: false, animalFactory: false */

  'use strict';

  $(document).ready(initialize);

  var animals = [];

  function initialize(){
    $('#add-img').click(addImg);
    $('#add-animal').click(addAnimal);
    animals = animalFactory();
  }

  function addImg(e){
    var $url = $('#url').val();
    var $imgDiv = $('<div class="imgDiv"></div>').css('background-image', 'url(' + $url + ')');
    $('#imgs').append($imgDiv);
    e.preventDefault();
  }

  function addAnimal(e){
    var species = $('#species').val();
    var color = $('#color').val();
    var name = $('#name').val();
    var age = $('#age').val() *1;
    var gender = $('#gender input:checked').val();
    var description = $('#description').val();
    var photos = getAnimalPhotos();
    var animal = new Animal(species, color, name, age, gender, description, photos);
    if (animal) {showAnimals(animals);}
    animals.push(animal);
    e.preventDefault();
  }

  function showAnimals(animals){
    $.each(animals, function(idx, animal){
      var $tr  = $('<tr>');
      var $td1 = $('<td>').append($('<a href=# data-search=species data-value='+animal.species+'>').text(animal.species));
      var $td2 = $('<td>').append($('<a href=# data-search=color data-value='+animal.color+'>').text(animal.color));
      var $td3 = $('<td>').text(animal.name);
      var $td4 = $('<td>').append($('<a href=# data-search=age data-value='+animal.age+'>').text(animal.age));
      var $td5 = $('<td>').append($('<a href=# data-search=gender data-value='+animal.gender+'>').text(animal.gender));
      var $td6 = $('<td>').text(animal.description);
      var $td7 = $('<td class="img">').css('background-image', animal.photos[0]);
      var $td8 = $('<td class="img">').css('background-image', animal.photos[1]);
      $tr.append($td3, $td1, $td5, $td4, $td2, $td6, $td7, $td8);
      $('#animalTable').append($tr);
    });
  }

  function getAnimalPhotos(){
    var imgArray = $('#imgs > .imgDiv');
    return _.map(imgArray, function(img){
      return $(img).css('background-image');
    });
  }

})();

