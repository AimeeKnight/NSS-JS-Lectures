/* global beforeEach, global, describe, require, it, before */
/* jshint expr:true */
'use strict';

var expect = require('chai').expect;
var Priority;

describe('Priority', function(){

  before(function(done){
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
    it('should create a new Priority', function(){
      var obj = {name:'High', value: '10'};
      var p1 = new Priority(obj);

      expect(p1).to.be.instanceof(Priority);
      expect(p1).to.have.property('name').and.equal('High');
      expect(p1).to.have.property('value').and.deep.equal(10);
    });
  });

  describe('#save', function(){
    it('should save a Priority object into the database', function(done){
      var obj = {name:'High', value: '10'};
      var p1 = new Priority(obj);
      p1.save(function(err){
        expect(err).to.be.null;
        expect(p1).to.be.instanceof(Priority);
        expect(p1.name).to.equal('High');
        expect(p1.value).to.deep.equal(10);
        expect(p1).to.have.property('_id').and.be.ok;
        done();
      });
    });

    it('should not create duplicate priorites based on name', function(done){
      var p1 = new Priority({name:'High', value:'10'});
      var p2 = new Priority({name:'Medium', value:'5'});
      var p3 = new Priority({name:'High', value:'1'});

      p1.save(function(){
        p2.save(function(){
          p3.save(function(err){
            expect(err).to.be.instanceof(Error);
            expect(p3._id).to.be.undefined;
            done();
          });
        });
      });
    });
  });

  describe('.findAll', function(){
    it('should return all Priorities in the datbase', function(done){
      var p1 = new Priority({name:'High', value:'10'});
      var p2 = new Priority({name:'Medium', value:'5'});
      var p3 = new Priority({name:'Low', value:'1'});

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
    it('should find the Priority by its name', function(done){
      var p1 = new Priority({name:'High', value:'10'});
      var p2 = new Priority({name:'Medium', value:'5'});
      var p3 = new Priority({name:'Low', value:'1'});

      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findByName('Medium', function(foundPriority){
              expect(foundPriority).to.be.instanceof(Priority);
              expect(foundPriority.name).to.equal('Medium');
              done();
            });
          });
        });
      });
    });

    it('should not find the Priority by its name', function(done){
      Priority.findByName('Medium', function(foundPriority){
        expect(foundPriority).to.be.null;
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find the Priority by its id', function(done){
      var p1 = new Priority({name:'High', value:'10'});
      var p2 = new Priority({name:'Medium', value:'5'});
      var p3 = new Priority({name:'Low', value:'1'});

      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            var id = p2._id.toString();
            Priority.findById(id, function(foundPriority){
              expect(foundPriority).to.be.instanceof(Priority);
              expect(foundPriority._id.toString()).to.equal(id);
              done();
            });
          });
        });
      });
    });

    it('should not find the Priority by its id', function(done){
      Priority.findById('01234567890123456789abcd', function(foundPriority){
        expect(foundPriority).to.be.null;
        done();
      });
    });
  });

});
