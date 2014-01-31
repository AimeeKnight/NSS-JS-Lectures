/* jshint camelcase:false */

(function(){
  'use strict';

  function receive(data){
    //debugger;
    console.log(data);
    var temp = data.current_observation.temp_f;
    $('h2').text(temp);
  }

  function getWeather(){
    var url = 'http://api.wunderground.com/api/b9a0220c410de9da/conditions/q/TN/Nashville.json?callback=?';
    $.getJSON(url, receive);
  }

  function init(){
    $('#get-weather').click(getWeather);
  }

  $(document).ready(init);

})();
