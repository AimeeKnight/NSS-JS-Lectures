'use strict';

module.exports = function(req, res, next){
  console.log(req);
  if(req.url === '/' || req.url === '/auth' || req.url === '/register' || req.url === '/login'){
    next();
  }else{
    if(req.session.userId){
      next();
    }else{
      res.redirect('/');
    }
  }
};

