/* global describe, require, it, before */
/* jshint expr:true */
'use strict';

var expect = require('chai').expect;
var Priority;

describe('Priority', function(){

  before(function(done){
    // connect is a function since module.exports was set to a function
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      Priority = global.nss.Priority;
      done();
    });
  });
  describe('new', function(){
    it('should create a new Priority', function(){
      var obj = {name:'High', value: '10'};
      var p1 = new Priority(obj);
      expect(p1).to.be.instanceof(Priority);
      expect(p1).to.have.property('name').and.equal('High');
      expect(p1).to.have.property('value').and.equal(10);
    });
  });

  describe('#save', function(){
    it('should save a priority object into the database', function(done){
      var obj = {name:'High', value: '10'};
      var p1 = new Priority(obj);
      p1.save(function(savedPriority){
        expect(savedPriority).to.be.instanceof(Priority);
        expect(savedPriority).to.have.property('_id').and.be.ok;
        done();
      });
    });
  });

});
