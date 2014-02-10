(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#one').click(one);
    $('#two').click(two);
    $('#add').click(sum);
    $('#drink').click(canDrink);
    $('#product').click(product);
    //$('#calc-names').click(calcNames);
  }

  function one(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/name?callback=?';
    $.getJSON(url, function(data){
      // log data when it comes back from node server
      console.log(data);
    });
  }

  function two(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/favcolor?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

  function sum(){
    var a = $('#num1').val();
    var b = $('#num2').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/sum/'+a+'/'+b+'?callback=?';
    $.getJSON(url, function(data){
      $('#sum').text(data.sum);
    });
  }

  function canDrink(){
    var a = $('#name').val();
    var b = $('#age').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/drink/'+a+'/'+b+'?callback=?';
    $.getJSON(url, function(data){
      $('#drink-answer').text(data.answer);
    });
  }

  function product(){
    var numbers = $('#numbers').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/product?numbers='+numbers+'&callback=?';
    $.getJSON(url, function(data){
      $('#product-response').text(data.product);
    });
  }

  /*
  function calcNames(){
    var names = $('#names').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/calc-names?names='+names+'&callback=?';
    $.getJSON(url, function(data){
      $('#product-response').text(data.product);
    });
  }
  */

})();

