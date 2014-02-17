$(document).ready(initalize);

function initalize(){
  $('#calc').click(compute);
  $('#calcMany').click(computeMany);
  $('#calc').click(gatherInfo);
  $('#clear').click(clear);
}

function clear(){
  $('#num1').val('');
  $('#num1').focus('');
  $('#num2').val('');
  $('#op').val('');
  $('#result').text('');
}

function gatherInfo(){
  var num1 = $('#num1').val();
  num1 = parseFloat(num1);

  var num2 = $('#num2').val();
  num2 = parseFloat(num2);

  var op = $('#op').val();
  var result = compute(num1, num2, op);
  $('#result').text(result);
}

function compute(x, y, op){
  var total;
  switch(op){
    case '+':
     total = x + y;
     console.log(total);
     break;
    case '-':
      total = x - y;
      break;
    case '*':
      total = x * y;
      break;
    case '/':
      total = x / y;
  }
  return total;
}

function computeMany(){
  var op = $('#op').val();
  var nums = $('.nums input');
  var total;

  if(op === '+'){
    total=0;
    $.each(nums,function(){
      var $num = $(this).val();
      total += parseFloat($num) || 0;
      $('#result').text(total);
      return total;
    });
  }else if (op === '*'){
  total=1;
    $.each(nums,function(){
      var $num = $(this).val();
      if ($num !== '');
        total *= parseFloat($num) || 1;
      $('#result').text(total);
      return total;
    });
  }
}
