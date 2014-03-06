'use strict';

var request = require('request');
var fs = require('fs');

exports.index = function(req, res){
  res.render('home/index', {title: 'Mailgun Demo'});
};

exports.email = function(req, res){
  var key = process.env.MAILGUN;
  var url = 'https://api:'+key+'@api.mailgun.net/v2/sandbox36742.mailgun.org/messages';
  // request brings down HTML from another website - enables scraping
  // request is sync and async
  var post = request.post(url, function(err, response, body){
    res.redirect('/');
  });
  var form = post.form();
  form.append('from', 'aimeemarieknight@gmail.com');
  form.append('to', req.body.to);
  form.append('to', req.body.to);
  //form.append('text', req.body.body);
  form.append('html', req.body.body);
  form.append('attachment', fs.createReadStream(__dirname + '/../static/img/startup_Bus1.png'));
  form.append('attachment', fs.createReadStream(__dirname + '/../static/img/startup_Bus1.png'));
};

