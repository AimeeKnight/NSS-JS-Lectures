(function(){

  'use strict';

  $(document).ready(init);

  var timer;

  function init(){
    $('#start').click(start);
    $('#stop').click(stop);
    $('#reset').click(reset);
  }

  function start(){
    clearInterval(timer);
    timer = setInterval(makeColorBox, 1000);
  }

  function makeColorBox(){
    var $div = $('<div>');
    $div.addClass('box');
    $div.css('background-color', randomColor());
    $('body').css('background-color', randomColor());
    $('#container').prepend($div);
  }

  function stop(){
    clearInterval(timer);
  }

  function reset(){
    $('body').css('background-color', 'white');
    $('#container').empty();
  }

  function randomColor(){
    var red = Math.floor(Math.random()*256);
    var blu = Math.floor(Math.random()*256);
    var grn = Math.floor(Math.random()*256);
    var alp = Math.random();
    var color = 'rgba('+red+','+grn+','+blu+','+alp+')';
    return color;
  }


})();
