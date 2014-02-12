(function(){

  'use strict';

  $(document).ready(init);

  function init(){
    $('#go').click(go);
  }

  function go(){
    var data = $('#data').val();
    data = data.split(';');
    var start = data[0];
    var stop = data[1];
    var increment = data[2];

    var array = _.range(start, stop, increment);
    var sample = _.sample(array);
    var shuffled = _.shuffle(array);

    var filtered3and4 = _.filter(array, function(x){
      return (x % 3 === 0) && (x % 4 === 0);
    });

    var reject = _.filter(array, function(x){
      return x % 2 !== 0;
    });

    var map = _.map([9,16,25,36], function(x){
      return Math.sqrt(x);
    });

    var areAllEven = _.all(array, function(x){
      return x % 2 === 0;
    });

    console.log(array);
    console.log(sample);
    console.log(shuffled);
    console.log(filtered3and4);
    console.log(reject);
    console.log(map);
    console.log(areAllEven);
  }

})();
