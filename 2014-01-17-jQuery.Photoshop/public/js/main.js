$(document).ready(init);

function init(){
  $('#add-color').click(clickAddColor);
  $('#add-pixels').click(clickAddPixels);
  $('#colors').on('click', '.color', clickSelectColor);
  $('#pixels').on('mouseover', '.pixel', hoverColorPixel);
}

function hoverColorPixel(){
  var color = $('.selected').css('background-color');
  $(this).css('background-color', color);
}

function clickAddPixels (){
  var num = $('#number-text').val();
  num = parseFloat(num);
  for (var i = 0; i < num; i++){
    var $pixel = $('<div>');
    $pixel.addClass('pixel');
    $('#pixels').prepend($pixel);
  }
}

function clickSelectColor(){
  if ($(this).hasClass('selected')){
    $('.color').removeClass('selected');
  }else{
    $('.color').removeClass('selected');
    $(this).addClass('selected');
  }
}

function clickAddColor(){
  var color = $('#color-text').val();
  $('#color-text').val('').focus();
  var $box = $('<div></div>').addClass('color').css('background-color', color);
  $('#colors').prepend($box);
}
