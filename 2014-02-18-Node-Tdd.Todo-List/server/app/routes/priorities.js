'use strict';

var Priority;

exports.create = function(req, res){
  Priority = global.nss.Priority;

  var p1 = new Priority(req.body);
  p1.save(function(){
    res.send(p1);
  });
};

