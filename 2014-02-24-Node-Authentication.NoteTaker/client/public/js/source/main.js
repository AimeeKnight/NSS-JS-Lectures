(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#user-form').hide();
    $('#login').click(showUserLogin);
  }

  function showUserLogin(){
    $('#user-form').show();
  }

})();

