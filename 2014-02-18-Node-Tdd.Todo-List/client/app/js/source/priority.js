(function(){
/*jshint validthis: true */

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    getPriorities();
    $('#save-priority').click(submitPriority);
    $('#priorities').on('click', '.delBtn',  deletePriority);
    $('#priorities').on('click', '.saveBtn',  updatePriority);
    $('#priorities').on('click', '.name',  editPriority);
    $('#priorities').on('click', '.value',  editPriorityValue);
  }

///////////// USERS //////////////
// ---------- CREATE ---------- //
  function submitPriority(event){
    var data = $('#priority').serialize();
    var url = window.location.origin.replace(/3000/, '4000') + '/priorities';
    //var url = window.location.origin + '4000/users';
    var type = 'POST';
    var success = newPriority;

    $.ajax({url:url, type:type, data:data,  success:success});
    event.preventDefault();
  }

  function newPriority(){
    $('#priority input').val('');
    getPriorities();
  }

// ---------- READ ---------- //
  function getPriorities(){
    $('tbody').empty();
    var url = window.location.origin.replace(/3000/, '4000') + '/priorities';
    //var url = window.location.origin + '4000/users';
    $.getJSON(url, displayPriorities);
  }

  function displayPriorities(data){
    console.log(data);
    $('#priorities > tbody').empty();
    for (var i = 0; i < data.priorities.length; i++){
      var $name = $('<td class="name"></td>');
      var $value = $('<td class="value"></td>');
      var $del = $('<td class="del"></td>');
      var $save = $('<td class="save"></td>');
      var $delBtn = $('<button class="delBtn tiny radius">Delete</button>');
      var $saveBtn = $('<button class="saveBtn tiny radius">Save</button>');

      $name.text(data.priorities[i].name);
      $value.text(data.priorities[i].value);
      $del.append($delBtn);
      $save.append($saveBtn);
      var $row = $('<tr>').attr('data-id', data.priorities[i]._id);
      $row.append($name, $value, $del, $save);
      $('#priorities > tbody').prepend($row);
    }
  }

// ---------- UPDATE ---------- //
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

})();

