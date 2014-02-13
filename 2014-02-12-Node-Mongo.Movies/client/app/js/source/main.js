(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    getMovies();
    $('#movie').submit(submitMovie);
    $('tbody').on('click', 'td',  queryMovies);
    $('tbody').on('click', '.deleteBtn',  deleteMovie);
    //$('tbody').on('click', 'td',  queryRatings);
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
    getMovies();
  }

  function getMovies(){
    var url = window.location.origin.replace(/3000/, '4000') + '/movies';
    $.getJSON(url, displayMovies);
  }

  function displayMovies(data){
    console.log(data);
    $('#movies > tbody').empty();
    for (var i = 0; i < data.movies.length; i++){
      var $name = $('<td>').addClass('name');
      var $rating = $('<td class="rating"></td>');
      var $length = $('<td class="length"></td>');
      var $year = $('<td class="yaer"></td>');
      var $studio = $('<td class="studio"></td>');
      var $actors = $('<td class="actors"></td>');
      var $director = $('<td class="director"></td>');
      var $poster = $('<td class="poster"></td>');
      var $button = $('<button class="deleteBtn tiny">Delete</button>');

      $name.text(data.movies[i].name);
      $rating.text(data.movies[i].rating);
      $length.text(data.movies[i].length);
      $year.text(data.movies[i].year);
      $studio.text(data.movies[i].studio);
      $actors.text(data.movies[i].actors.join(', '));
      $director.text(data.movies[i].director);

      var $posterDiv = $('<div class="img box-shadow"></div>').css('background-image', 'url('+data.movies[i].poster+')');
      $poster.append($posterDiv);

      var $row = $('<tr>').attr('data-id', data.movies[i]._id);
      $row.append($name, $rating, $length, $year, $studio, $director, $actors, $poster, $button);
      $('#movies > tbody').prepend($row);
    }
  }
  
  function queryMovies(){
    //var movie = $(this).text();
    //var key = $(this).attr('class');
    var url = window.location.origin.replace(/3000/, '4000');
    url += '/movies';
    url += '/query?'+$(this).attr('class')+'='+$(this).text();
    //url += '/query?'+key+'='+movie;
    //url += movie;
    $.getJSON(url, displayMovies);
  }

  function deleteMovie(event){
    var rowId = $(this).closest('tr').data('id');
    var url = window.location.origin.replace(/3000/, '4000') + '/movies/';
    url += rowId;
    var type = 'DELETE';
    var success = getMovies;

    $.ajax({url:url, type:type, success:success});
    event.preventDefault();
  }

  /*
  function queryRatings(){
    var rating = $(this).text();
    console.log(rating);
    var url = window.location.origin.replace(/3000/, '4000');
    url += '/movies/';
    url += rating;
    $.getJSON(url, displayMovies);
  }
  */

})();

