/* global beforeEach, global, describe, require, it, before */
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

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('new', function(){
    it('creates a new Priority', function(){
      var obj = {name:'High', value: '10'};
      var p1 = new Priority(obj);
      expect(p1).to.be.instanceof(Priority);
      expect(p1).to.have.property('name').and.equal('High');
      expect(p1).to.have.property('value').and.equal(10);
    });
  });

  describe('#save', function(){
    it('saves a priority object into the database', function(done){
      var obj = {name:'High', value: '10'};
      var p1 = new Priority(obj);
      // savedPriority of json object returned from Mongo and passed to callback
      p1.save(function(savedPriority){
        expect(savedPriority).to.be.instanceof(Priority);
        expect(savedPriority).to.have.property('_id').and.be.ok;
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('returns all Priorities in the database', function(done){
      var p1 = new Priority({name:'High', value: '10'});
      var p2 = new Priority({name:'Medium', value: '5'});
      var p3 = new Priority({name:'Low', value: '1'});

      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findAll(function(priorities){
              expect(priorities).to.have.length(3);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByName', function(){
    it('returns a priority based on the name passed in', function(done){
      var p1 = new Priority({name:'High', value: '10'});
      var p2 = new Priority({name:'Medium', value: '5'});
      var p3 = new Priority({name:'Low', value: '1'});

      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findByName('High', function(priority){
              expect(priority).to.have.property('name').and.equal('High');
              done();
            });
          });
        });
      });
    });
  });

});
