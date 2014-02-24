(function(){
/*jshint validthis:true */

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
    var data = $('#user').serialize();
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/users';
    var type = 'POST';
    var success = showRegisterAttempt;
    $.ajax({url:url, type:type, data:data, success:success});
    event.preventDefault();
  }

  function login(event){
    var data = $('#user').serialize();
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/users/login';
    var type = 'PUT';
    var success = showLoginAttempt;
    $.ajax({url:url, type:type, data:data, success:success});
    event.preventDefault();
  }

  function showRegisterAttempt(data){
    if(data.success){
      alert('You have successfully registered');
    }else{
      alert('Email already taken');
    }
    console.log(data);
  }

  function showLoginAttempt(data){
    if(data.success){
      alert('You have successfully logged in');
    }else{
      alert('Login Failed');
    }
    console.log(data);
  }

})();

