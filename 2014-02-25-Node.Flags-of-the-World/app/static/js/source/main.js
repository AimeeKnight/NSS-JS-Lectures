(function(){

  'use strict';

  $(document).ready(initialize);
  var countryName;
  var flagCode;

  function initialize(){
    $(document).foundation();
    $('.flag').click(getCountryCode);
    $('.country').click(getCountryName);
    $('#match').click(lookUpMatch);
    countDown();
  }

  function countDown(){
    var i = 120;
    var $timerH5 = $('#timer').text(i);
    i--;
    if (i < 0){
      $timerH5.text('Time is up!');
    }else{
      setTimeout(countDown, 1000);
    }
  }

  function getCountryCode(){
    flagCode = $(this).attr('class');
    flagCode = flagCode.replace(/flag flag-/, '');
    $('#flag-code').text(flagCode);
  }

  function getCountryName(){
    countryName = $(this).text();
    $('#country-name').text(countryName);
  }

  function lookUpMatch(){
    var url = '/flags?countryName='+countryName+'&flagCode='+flagCode;
    $.getJSON(url, showResult);
  }

  function showResult(data){
    console.log(data.match);
  }
})();


