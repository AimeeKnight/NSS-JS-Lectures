(function(){

  'use strict';
  $(document).ready(init);

  function init(){
    $('#add-item').click(addItem);
  }

  function addItem(e){
    var itm = $('#itm').val();
    var qty = $('#qty').val();
    var amt = $('#amt').val();
    var total = qty * amt;
    addItemToTable(itm, qty, amt, total);
    updateTotals();
    e.preventDefault();
  }

  function addItemToTable(itm, qty, amt, total){
    var $tr = $('<tr>');
    var $itm = $('<td>');
    $itm.text(itm);
    var $qty = $('<td>');
    $qty.text(qty);
    var $amt = $('<td>');
    $amt.text(numToCurrency(amt * 1));
    var $total = $('<td>');
    $total.text(numToCurrency(total * 1));

    $tr.append($itm, $qty, $amt, $total);
    $('table tbody').append($tr);
  }

  function numToCurrency(num){
    return '$' + num.toFixed(2);
  }

  function updateTotals(){
    var $amounts =  $('table > tbody > tr > td:nth-child(3)');
    var nums = transformTdsToNums($amounts);
    var sumAmounts = sum(nums);
    $('table > tfoot > tr > td:nth-child(3)').text(numToCurrency(sumAmounts));

    var $totals =  $('table > tbody > tr > td:nth-child(4)');
    var nums2 = transformTdsToNums($totals);
    var sumTotals = sum(nums2);
    $('table > tfoot > tr > td:nth-child(4)').text(numToCurrency(sumTotals));
  }

  function sum(nums){
    var total = 0;
    for(var i=0; i< nums.length; i++){
      total += nums[i];
    }
    return total;
  }

  function transformTdsToNums($tds){
    return $.map($tds, function(td){
      return td.textContent.slice(1) * 1;
    });
  }

})();
