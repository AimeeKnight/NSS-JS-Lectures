(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#add').click(addStock);
  }

  function addStock(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    var numbers = $('#stock').val();
    url += '/stock?stock='+symbol+'&callback=?';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

})();

