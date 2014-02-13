(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    getMovies();
    $('#movie').submit(submitMovie);
    $('#updateMovie').submit(updateMovie);
    $('tbody').on('click', 'td',  queryMovies);
    $('tbody').on('click', '.deleteBtn',  deleteMovie);
    $('tbody').on('click', '.updateBtn',  editMovie);
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
      var $year = $('<td class="year"></td>');
      var $studio = $('<td class="studio"></td>');
      var $actors = $('<td class="actors"></td>');
      var $director = $('<td class="director"></td>');
      var $poster = $('<td class="poster"></td>');
      var $deleteBtn = $('<button class="deleteBtn tiny">Delete</button>');
      var $updateBtn = $('<button class="updateBtn tiny">Update</button>');

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
      $row.append($name, $rating, $length, $year, $studio, $director, $actors, $poster, $deleteBtn, $updateBtn);
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
    $.getJSON(url, displayMovies);
  }
  
  function editMovie(){
    $('#movie').attr('id','updateMovie');
    $('#movie').text('Update Movie');
    var $row = $(this).closest('tr');
    var name = $row.find('.name').text();
    var rating = $row.find('.rating').text();
    var length = $row.find('.length').text();
    var year = $row.find('.year').text();
    var studio = $row.find('.studio').text();
    var actors = $row.find('.actors').text();
    var director = $row.find('.director').text();

    var posterUrl = $row.find('.img').css('background-image');
    posterUrl = posterUrl.replace('url(','').replace(')','');

    $('input[name=name]').val(name);
    $('input[name=rating]').val(rating);
    $('input[name=length]').val(length);
    $('input[name=year]').val(year);
    $('input[name=studio]').val(studio);
    $('input[name=actors]').val(actors);
    $('input[name=director]').val(director);
    $('input[name=poster]').val(posterUrl);
  }

  function updateMovie(){
    var rowId = $(this).closest('tr').data('id');
    var url = window.location.origin.replace(/3000/, '4000') + '/movies/';
    url += rowId;
    var type = 'UPDATE';
    var data = $(this).serialize();
    var success = function (data){
      console.log(data);
    };

    $.ajax({url:url, type:type, data:data, success:success});
    event.preventDefault();
  }

  function deleteMovie(event){
    var rowId = $(this).closest('tr').data('id');
    var url = window.location.origin.replace(/3000/, '4000') + '/movies/';
    url += rowId;
    var type = 'DELETE';
    // node sends back the number of movies deleted and the movie id
    var success = removeMovie;

    $.ajax({url:url, type:type, success:success});
    event.preventDefault();
  }

  function removeMovie(data){
    if (data.deleted === 1){
      // remove the movies from the dom by 
      // matching data.id to the dom elements with a matching data attribute
      $('.poster[data-id]='+data.id+'').remove();
    }
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

