(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    getMovies();
    $('#movie').submit(submitMovie);
    $('tbody').on('click', 'td',  queryMovies);
  }

  function submitMovie(event){
    var data = $(this).serialize();
    var url = window.location.origin.replace(/3000/, '4000') + '/movies';
    var type = 'POST';
    var success = newMovie;

    $.ajax({url:url, type:type, data:data,  success:success});
    event.preventDefault();

  }

  function newMovie(){
    $('#movies input').val('');
  }

  function getMovies(){
    var url = window.location.origin.replace(/3000/, '4000') + '/movies';
    $.getJSON(url, displayMovies);
  }

  function displayMovies(data){
    for (var i = 0; i < data.movies.length; i++){
      var $name = $('<td>');
      var $rating = $('<td class="rating"></td>');
      var $length = $('<td>');
      var $year = $('<td>');
      var $studio = $('<td>');
      var $actors = $('<td>');
      var $director = $('<td>');
      var $poster = $('<td>');

      $name.text(data.movies[i].name);
      $rating.text(data.movies[i].rating);
      $length.text(data.movies[i].length);
      $year.text(data.movies[i].year);
      $studio.text(data.movies[i].studio);
      $actors.text(data.movies[i].actors.join(', '));
      $director.text(data.movies[i].director);

      var $posterDiv = $('<div class="img box-shadow"></div>').css('background-image', 'url('+data.movies[i].poster+')');
      $poster.append($posterDiv);

      var $row = $('<tr id="'+data.movies[i].name+'"></tr>');
      $row.append($name, $rating, $length, $year, $studio, $director, $actors, $poster);
      $('#movies > tbody').prepend($row);
    }
  }
  
  function queryMovies(){
    var movie = $(this).text();
    console.log(movie);
    var url = window.location.origin.replace(/3000/, '4000');
    url += '/movies/';
    url += movie;
    $.getJSON(url, displayMovie);
  }

  function displayMovie(data){
    displayMovies(data);
  }

})();

