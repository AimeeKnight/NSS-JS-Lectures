/* jshint expr:true */

'use strict';

process.env.DBNAME = 'todo-test';
var expect = require('chai').expect;
var Mongo = require('mongodb');
var Priority, Task;
var p1, p2, p3;

describe('Task', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Priority = require('../../app/models/priority');
      Task = require('../../app/models/task');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      p1 = new Priority({name:'High', value:'7'});
      p2 = new Priority({name:'Medium', value:'5'});
      p3 = new Priority({name:'Low', value:'3'});

      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            done();
          });
        });
      });
    });
  });
  // ------------------------------------------------------------------------ //
  describe('new', function(){
    it('should create a new Task', function(){
      var obj = {_id:'01234567890123456789abcd',
                 priorityId:'dcba98765432109876543210',
                 title:'Coding',
                 dueDate:'2014-02-15',
                 isComplete:'on',
                 tags:'Home, Work, NSS'};
      var t1 = new Task(obj);

      expect(t1).to.be.instanceof(Task);
      expect(t1._id).to.be.instanceof(Mongo.ObjectID);
      expect(t1.priorityId).to.be.instanceof(Mongo.ObjectID);
      expect(t1.title).to.equal('Coding');
      expect(t1.dueDate).to.be.instanceof(Date);
      expect(t1.isComplete).to.be.true;
      expect(t1.tags).to.have.length(3);
    });
    it('should create a new incomplete Task - 1', function(){
      var obj = {};
      var t1 = new Task(obj);

      expect(t1).to.be.instanceof(Task);
      expect(t1._id).to.be.null;
      expect(t1.priorityId).to.be.null;
      expect(t1.title).to.be.undefined;
      expect(t1.dueDate).to.be.null;
      expect(t1.isComplete).to.be.false;
      expect(t1.tags).to.have.length(0);
    });
    it('should create a new incomplete Task - 2', function(){
      var obj = {_id:'',
                 priorityId:'',
                 title:'',
                 dueDate:'',
                 isComplete:'',
                 tags:''};
      var t1 = new Task(obj);

      expect(t1).to.be.instanceof(Task);
      expect(t1._id).to.be.null;
      expect(t1.priorityId).to.be.null;
      expect(t1.title).to.equal('');
      expect(t1.dueDate).to.be.null;
      expect(t1.isComplete).to.be.false;
      expect(t1.tags).to.have.length(0);
    });
  });
  // ------------------------------------------------------------------------ //
  describe('#save', function(){
    it('should save a new Task', function(done){
      var obj = {priorityId:'dcba98765432109876543210',
                 title:'Coding',
                 dueDate:'2014-02-15',
                 isComplete:'on',
                 tags:'Home, Work, NSS'};
      var t1 = new Task(obj);
      t1.save(function(){
        expect(t1._id.toString()).to.have.length(24);
        done();
      });
    });
    it('should not save a new Task', function(done){
      var obj = {};
      var t1 = new Task(obj);
      t1.save(function(err){
        expect(t1._id).to.be.null;
        expect(err).to.be.instanceof(Error);
        done();
      });
    });
    it('should update an existing Task', function(done){
      var x = {priorityId:'dcba98765432109876543210',
                 title:'Coding',
                 dueDate:'2014-02-15'};
      var t1 = new Task(x);
      t1.save(function(){
        var y  = {priorityId:'dcba98765432109876543210',
                 title:'Running',
                 dueDate:'2014-02-15',
                 isComplete:'on',
                 _id: t1._id.toString()};
        var t2 = new Task(y);
        t2.save(function(){
          expect(t2._id.toString()).to.equal(t1._id.toString());
          expect(t2.isComplete).to.be.true;
          expect(t2.title).to.equal('Running');
          done();
        });
      });
    });
  });
  // ------------------------------------------------------------------------ //
  describe('.find', function(){
    beforeEach(function(done){
      var p1id = p1._id.toString();
      var p2id = p2._id.toString();
      var p3id = p3._id.toString();

      var o1 = {priorityId:p1id, tags:'a,b,c', title:'groceries', dueDate:'2014-03-25'};
      var o2 = {priorityId:p2id, tags:'b,c,d', title:'gas', dueDate:'2014-03-21'};
      var o3 = {isComplete:'on', priorityId:p3id, tags:'a,d,e', title:'clean', dueDate:'2014-03-19'};
      var o4 = {priorityId:p1id, tags:'e,f,g', title:'work', dueDate:'2014-03-22'};
      var o5 = {isComplete:'on', priorityId:p2id, tags:'g,a,d', title:'code', dueDate:'2014-03-10'};
      var o6 = {priorityId:p3id, tags:'r,c,x', title:'school', dueDate:'2014-03-12'};
      var o7 = {priorityId:p1id, tags:'t,a,d', title:'javascript', dueDate:'2014-03-27'};
      var o8 = {priorityId:p2id, tags:'z,y,a', title:'node', dueDate:'2014-03-05'};
      var o9 = {priorityId:p3id, tags:'b,n,s', title:'express', dueDate:'2014-03-14'};
      var oa = {isComplete:'on', priorityId:p1id, tags:'z,r,b', title:'tmux', dueDate:'2014-03-09'};
      var ob = {priorityId:p2id, tags:'c,x,y', title:'vim', dueDate:'2014-03-01'};

      (new Task(o1)).save(function(){
        (new Task(o2)).save(function(){
          (new Task(o3)).save(function(){
            (new Task(o4)).save(function(){
              (new Task(o5)).save(function(){
                (new Task(o6)).save(function(){
                  (new Task(o7)).save(function(){
                    (new Task(o8)).save(function(){
                      (new Task(o9)).save(function(){
                        (new Task(oa)).save(function(){
                          (new Task(ob)).save(function(){
                            done();
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });

    it('should find all tasks - page 1, 5 per page', function(done){
      var query = {};

      Task.find(query, function(tasks){
        expect(tasks).to.have.length(5);
        done();
      });
    });
    it('should find all tasks - page 1, 4 per page', function(done){
      var query = {limit:'4'};

      Task.find(query, function(tasks){
        expect(tasks).to.have.length(4);
        done();
      });
    });
    it('should find all tasks - page 3, 1 task remaing', function(done){
      var query = {page:'3'};

      Task.find(query, function(tasks){
        expect(tasks).to.have.length(1);
        done();
      });
    });
    it('should filter all tasks by priority', function(done){
      var query = {filterName:'priorityId', filterValue:p1._id.toString()};

      Task.find(query, function(tasks){
        expect(tasks).to.have.length(4);
        done();
      });
    });
    it('should filter all tasks by tag', function(done){
      var query = {filterName:'tags', filterValue:'c'};

      Task.find(query, function(tasks){
        expect(tasks).to.have.length(4);
        done();
      });
    });
    it('should sort all tasks by dueDate', function(done){
      var query = {sort:'dueDate'};

      Task.find(query, function(tasks){
        expect(tasks).to.have.length(5);
        expect(tasks[0].dueDate.toString()).to.equal('Fri Feb 28 2014 18:00:00 GMT-0600 (CST)');
        done();
      });
    });
    it('should sort all tasks by dueDate, decending order', function(done){
      var query = {sort:'dueDate', direction:'-1'};

      Task.find(query, function(tasks){
        expect(tasks).to.have.length(5);
        expect(tasks[0].dueDate.toString()).to.equal('Wed Mar 26 2014 19:00:00 GMT-0500 (CDT)');
        done();
      });
    });
    it('should sort all tasks by isComplete, descending order', function(done){
      var query = {sort:'isComplete', direction:'-1'};

      Task.find(query, function(tasks){
        expect(tasks[0].isComplete).to.be.true;
        done();
      });
    });
    it('should filter and sort all tasks', function(done){
      var query = {page:'2', limit:'2', filterName:'tags', filterValue:'a', sort:'dueDate', direction:'1'};

      Task.find(query, function(tasks){
        expect(tasks).to.have.length(2);
        expect(tasks[0].title).to.equal('clean');
        done();
      });
    });
  });
  // ------------------------------------------------------------------------ //
});

