(function(){
/*jshint validthis: true */
/*jshint camelcase: false */

  'use strict';

  $(document).ready(initialize);
  var $checkBox;
  var page = 2;

  function initialize(){
    $(document).foundation();
    getPriorities();
    getTodos();
    $('#save-todo').click(submitTodo);
    $('#next').click(paginateForward);
    //$('#back').click(paginateBack);
    //$('#priorities').on('click', '.saveBtn',  updatePriority);
    //$('#priorities').on('click', '.name',  editPriority);
    //$('#priorities').on('click', '.value',  editPriorityValue);
  }

///////////// USERS //////////////
// ---------- CREATE ---------- //
  function submitTodo(event){
    var data = $('#todo').serialize();
    console.log(data);
    var url = window.location.origin.replace(/3000/, '4000') + '/todos';
    //var url = window.location.origin + '4000/users';
    var type = 'POST';
    var success = newTodo;

    $.ajax({url:url, type:type, data:data,  success:success});
    event.preventDefault();
  }

  function newTodo(){
    $('#todo input').val('');
    getTodos();
  }

// ---------- READ ---------- //
  function getPriorities(){
    $('tbody').empty();
    var url = window.location.origin.replace(/3000/, '4000') + '/priorities';
    //var url = window.location.origin + '4000/priorities';
    $.getJSON(url, displayPriorities);
  }

  function displayPriorities(data){
    console.log(data);
    for (var i = 0; i < data.priorities.length; i++){
      var $name = $('<option class="name">help</option>');

      $name.text(data.priorities[i].name);
      $name.val(data.priorities[i]._id);
      $('#priority-drop-down').append($name);
    }
  }

  function getTodos(){
    var url = window.location.origin.replace(/3000/, '4000') + '/todos';
    //var url = window.location.origin + '4000/todos';
    $.getJSON(url, displayTodos);
  }

  function displayTodos(data){
    $('tbody').empty();
    for (var i = 0; i < data.todos.length; i++){
      var $isComplete = $('<td class="isComplete"></td>');
      var $name = $('<td class="name"></td>');
      var $date = $('<td class="date"></td>');
      var $priority = $('<td class="priority"></td>');
      var $tags = $('<td class="tags"></td>');

      var priorityId = data.todos[i].priority_id;
      var priorityName = $('option[value="'+priorityId+'"]').text();

      var date = data.todos[i].date;
      var dateString = new Date(date).toDateString();

      var completed = data.todos[i].isComplete;

      if (completed){
        $checkBox = $('<input type="checkbox" name="isComplete" checked="true"></input>');
      }else{
        $checkBox = $('<input type="checkbox" name="isComplete"></input>');
      }

      $isComplete.append($checkBox);
      $name.text(data.todos[i].name);
      $date.text(dateString);
      $priority.text(priorityName);
      $tags.text(data.todos[i].tags.join(', '));
      var $row = $('<tr>').attr('data-id', data.todos[i]._id);
      $row.append($isComplete, $name, $date, $priority, $tags);
      $('#todos > tbody').append($row);
    }
  }

  function paginateForward(){
    var limit = $('#limit').val();
    var url = window.location.origin.replace(/3000/, '4000') + '/todos?page='+page+'&limit='+limit;
    console.log(url);
    $.getJSON(url, displayTodos);
    page += 1;
  }

// ---------- UPDATE ---------- //
/*
  function editPriority(){
    var $name = $('<td class="update-name-td"></td>');
    var $input = $('<input class="update-name-input"></input>');
    $name.append($input);
    $(this).replaceWith($name);
  }

  function editPriorityValue(){
    var $value = $('<td class="update-value-td"></td>');
    var $input = $('<input class="update-value-input"></input>');
    $value.append($input);
    $(this).replaceWith($value);
  }

  function updatePriority(){
    var name;
    var value;
    var newName = $(this).parent('.save').siblings('.update-name-td').find('.update-name-input').val();
    var oldName = $(this).parent('.save').siblings('.name').text();

    var newValue = $(this).parent('.save').siblings('.update-value-td').find('.update-value-input').val();
    var oldValue = $(this).parent('.save').siblings('.value').text();

    if (newName){
      name = newName;
    }else{
      name = oldName;
    }

    if (newValue){
      value = newValue;
    }else{
      value = oldValue;
    }

    console.log(value);
    console.log(name);

    var priorityId = $(this).parent('.save').parent('tr').data('id');
    var url = window.location.origin.replace(/3000/, '4000') + '/priorities/';
    url += priorityId;
    var data = {name:name, value:value};
    var type = 'PUT';
    var success = changePriority;

    $.ajax({url:url, type:type, data:data, success:success});
    event.preventDefault();
  }


  function changePriority(data){
    if (data.deleted === 1){
      console.log(data);
      getPriorities();
    }
  }

// ---------- DESTROY ---------- //

  function deletePriority(){
    var priorityId = $(this).parent('.del').parent('tr').data('id');
    var url = window.location.origin.replace(/3000/, '4000') + '/priorities/';
    //var url = window.location.origin + '4000/gadgets';
    url += priorityId;
    var type = 'DELETE';
    // node sends back the number of gadgets deleted and the gadget id
    var success = removePriority;

    $.ajax({url:url, type:type, success:success});
  }

  function removePriority(){
    getPriorities();
  }
  */

})();

