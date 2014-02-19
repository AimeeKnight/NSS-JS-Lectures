/* global process, require, describe, afterEach, global, it */
'use strict';

process.env.DBNAME = 'todo-test';
var app = require('../../app/app');
var request = require('supertest');
var expect = require('chai').expect;

describe('priorities', function(){

  afterEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('POST /priorities', function(){
    it('should create a new priority', function(done){
      request(app)
      .post('/priorities')
      .send({name:'Medium', value:'5'})
      .end(function(err, res){
        expect(res.body.name).to.equal('Medium');
        expect(res.body.value).to.deep.equal(5);
        expect(res.body._id).to.have.length(24);
        done();
      });
    });
  });
});

