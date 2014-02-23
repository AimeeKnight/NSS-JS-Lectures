(function(){
/*jshint validthis: true */
/*jshint camelcase: false */

  'use strict';

  $(document).ready(initialize);
  var $checkBox;
  var page = 1;
  var limit;
  var url;
  var tag;

  function initialize(){
    $(document).foundation();
    getPriorities();
    getTodos();
    $('#save-todo').click(submitTodo);
    $('#next').click(paginateForward);
    $('#back').click(paginateBack);
    $('#reset').click(getTodos);
    $('#show-completed').click(showCompleted);
    $('#show-remaining').click(showRemaining);
    $('#todos > tbody').on('click', '.tag-link',  getTags);
    $('#todos > tbody').on('click', 'input[name="isComplete"]', updateCompleted);
  }

  function getLimit(){
    limit = ($('#limit').val()) ? ($('#limit').val()) : 5;
  }

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
    for (var i = 0; i < data.priorities.length; i++){
      var $name = $('<option class="name">help</option>');

      $name.text(data.priorities[i].name);
      $name.val(data.priorities[i]._id);
      $('#priority-drop-down').append($name);
    }
  }

  function getTags(event){
    event.stopImmediatePropagation();
    event.preventDefault();
    var tagName = $(this).text();
    queryTags(tagName);
  }

  function queryTags(tagName){
    getLimit();
    tag = tagName;
    url = window.location.origin.replace(/3000/, '4000') + '/todos?limit='+limit+'&tags='+tag;
    $.getJSON(url, displayTodos);
  }

  function getTodos(){
    getLimit();
    url = window.location.origin.replace(/3000/, '4000') + '/todos?limit='+limit;
    //url = window.location.origin + '4000/todos';
    $.getJSON(url, displayTodos);
  }

  function displayTodos(data){
    console.log(data);
    $('tbody').empty();
    //if (data.todos.length > 0){
    if (true){
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

        var tags = data.todos[i].tags;
        makeLinks(tags, $tags);

        $isComplete.append($checkBox);
        $name.text(data.todos[i].name);
        $date.text(dateString);
        $priority.text(priorityName);
        var $row = $('<tr>').attr('data-id', data.todos[i]._id);
        $row.append($isComplete, $name, $date, $priority, $tags);
        $('#todos > tbody').append($row);
      }
    }
  }

  function showCompleted(){
    url = window.location.origin.replace(/3000/, '4000') + '/todos/completed';
    console.log(url);
    $.getJSON(url, displayTodos);
  }

  function showRemaining(){
    url = window.location.origin.replace(/3000/, '4000') + '/todos/uncompleted';
    console.log(url);
    $.getJSON(url, displayTodos);
  }


  function makeLinks(tags, $tags){
    tags.forEach(function(tag){
      var $anchor = $('<a href="#" class="tag-link">'+tag+'</a>');
      var $br = $('<br>');
      $tags.append($anchor, $br);
    });
  }

  function paginateForward(){
    getLimit();
    var url = window.location.origin.replace(/3000/, '4000') + '/todos?page='+(page + 1)+'&limit='+limit;
    $.getJSON(url, function(data){
      if (data.todos.length > 0){
        page += 1;
        displayTodos(data);
      }
    });
  }

  function paginateBack(){
    getLimit();
    if (page >= 2){
      var url = window.location.origin.replace(/3000/, '4000') + '/todos?page='+(page - 1)+'&limit='+limit;
      $.getJSON(url, function(data){
        if (data.todos.length > 0){
          page -= 1;
          displayTodos(data);
        }
      });
    }
  }

// ---------- UPDATE ---------- //
  function updateCompleted(){
    var checked;
    var tagsArray = [];

    if($(this).is(':checked')){
      checked = 'on';
    } else {
      checked = false;
    }

    var name = $(this).parent('.isComplete').siblings('.name').text();
    var date = $(this).parent('.isComplete').siblings('.date').text();
    var priority = $(this).parent('.isComplete').siblings('.priority').text();
    var priorityOption = $('option.name').text(priority);
    var priorityId = $(priorityOption).val();
    var tags = $(this).parent('.isComplete').siblings('.tags');

    tags.each(function(){
      tagsArray.push($(this).text());
    });

    var todoId = $(this).parent('.isComplete').parent('tr').data('id');

    var url = window.location.origin.replace(/3000/, '4000') + '/todos/';
    url += todoId;

    var data = {name:name, date:date, isComplete:checked, tags:tagsArray, priority_id:priorityId};
    var type = 'PUT';
    var success = changeCompleted;

    $.ajax({url:url, type:type, data:data, success:success});
    event.preventDefault();
  }

  function changeCompleted(data){
    console.log(data);
    getTodos();
  }

// ---------- DESTROY ---------- //

  /*
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

