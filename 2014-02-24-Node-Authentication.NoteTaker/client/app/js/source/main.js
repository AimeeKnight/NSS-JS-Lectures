(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#user-form').addClass('hide');
    $('#authenticate').click(showUserLogin);
    $('#register').click(register);
    $('#login').click(login);
  }

  function showUserLogin(){
    $('#user-form').toggleClass('hide');
  }

  function register(event){
    event.preventDefault();
  }

  function login(event){
    event.preventDefault();
  }

})();

