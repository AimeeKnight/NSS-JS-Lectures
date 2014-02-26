(function(){

  'use strict';

  $(document).ready(initialize);
  var countryName;
  var flagCode;
  var i = 120;
  var $clickedFlag, $clickedCountryName;

  function initialize(){
    $(document).foundation();
    $('.flag').click(getCountryCode);
    $('.country').click(getCountryName);
    $('#match').click(lookUpMatch);
  }

  var timer = setInterval(countDown, 1000);

  
  function countDown(){
    if (i === 0){
      clearInterval(timer);
      $('#timer').text('Time is up!');
    }else{
      i--;
      $('#timer').text(i);
    }
  }

  function getCountryCode(){
    if ($clickedFlag){
      $clickedFlag.removeClass('flag-lose');
      $clickedCountryName.removeClass('alert-box warning radius');
    }
    $clickedFlag = $(this);
    flagCode = $(this).attr('class');
    flagCode = flagCode.replace(/flag flag-/, '');
  }

  function getCountryName(){
    $clickedCountryName = $(this);
    countryName = $(this).text();
    $('#country-name').text(countryName);
  }

  function lookUpMatch(){
    var url = '/flags?countryName='+countryName+'&flagCode='+flagCode;
    $.getJSON(url, showResult);
  }

  function showResult(data){
    if (data.match){
      $clickedFlag.addClass('flag-win', 1000, 'easeOutBounce' );
      $clickedCountryName.addClass('alert-box success radius', 1000, 'easeOutBounce' );
    }else{
      $clickedFlag.addClass('flag-lose', 1000, 'easeOutBounce' );
      $clickedCountryName.addClass('alert-box warning radius', 1000, 'easeOutBounce' );
    }
  }

})();


