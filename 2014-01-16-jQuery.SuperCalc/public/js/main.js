$(document).ready(initalize);

function initalize(){
  $('.number').click(displayNumber);
  $('#neg').click(changeSign);
  $('#push').click(pushToQueue);
  $('.operator').click(compute);
  $('.button').mousedown(pushed);
  $('#clear').click(clear);
}

function pushed(){
  $(this).css('background-color','#2c3e50');
  $(this).mouseup(function() {
    if ($(this).hasClass('number') || this.id === 'neg')
      $(this).css('background-color', '#1abc9c');
    else if ($(this).hasClass('operator'))
      $(this).css('background-color', '#9b59b6');
    else
      $(this).css('background-color', '#3498db');
  });
}

function displayNumber(){
  var $this = $(this).text();

  if ($this === '.' && containsChar($('#answer').text(),'.' !== -1))
    return false;
  if ($('#answer').text() === '0')
    $('#answer').text('');

  var oldNum = $('#answer').text();
  $('#answer').text(oldNum + $this);
}

/*function negate(){
  var minus = '-';
  var $currentNum = $('#answer').text();
  if ($currentNum.indexOf('-') === -1){
    $currentNum = minus.concat($currentNum);
    $('#answer').text($currentNum);
  }else{
    $currentNum = $currentNum.slice(1);
    $('#answer').text($currentNum);
  }
}
*/

function changeSign(){
  var currentNum = $('#answer').text();
  currentNum *= -1;
  $('#answer').text(currentNum);
}

function pushToQueue(){
 var display = $('#answer').text();
 var displayInt = parseFloat(display);
 $('#answer').text('0');
 var $li = $('#queue').prepend("<li>" + display + "</li>");
}

function clear(){
  $('#').focus('');
  $('#op').val('');
  $('#answer').text('0');
  $('#queue').text('');
}

function compute(){
  var operator = this.id;
  var total = 0;
  var $lis = $('#queue li');
  var numbers = parseTags($lis);

  switch(operator){
    case 'add':
      $('#queue li').each(function(i){
        var num = parseFloat($(this).text());
        total += num;
      });
      break;
    case 'sub':
        total = numbers[1] - numbers[0];
      break;
    case 'mul':
        total = numbers[0] * numbers[1];
      break;
    case 'div':
        total = numbers[1] / numbers[0];
      break;
    case 'sum':
      $('#queue li').each(function(i){
        var num = parsefloat($(this).text());
        total += num;
      });
      break;
    case'pow':
      total = 1;
      for(i=0; i< numbers[0]; i++){
        total *= numbers[1];
      }
      break;
  }
  $('#answer').text(total);
  $('#queue').empty();
}
