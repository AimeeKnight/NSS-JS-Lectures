/* jshint expr:true */

'use strict';

process.env.DBNAME = 'todo-test';
var app = require('../../app/app');
var request = require('supertest');
var expect = require('chai').expect;
var Priority, Task;
var p1, p2, p3;

describe('tasks', function(){

  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
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

  describe('POST /tasks', function(){
    it('should not create a new task', function(done){
      request(app)
      .post('/tasks')
      .send({})
      .end(function(err, res){
        expect(res.body._id).to.be.null;
        done();
      });
    });
    it('should create a new task', function(done){
      request(app)
      .post('/tasks')
      .send({title:'Coding', dueDate:'2014-02-15', priorityId:p1._id.toString()})
      .end(function(err, res){
        expect(res.body._id).to.have.length(24);
        expect(res.body.tags).to.have.length(0);
        done();
      });
    });
  });

  describe('PUT /tasks/3', function(){
    it('should update an existing task', function(done){
      var obj = {priorityId:'dcba98765432109876543210',
                 title:'Coding',
                 dueDate:'2014-02-15'};
      var t1 = new Task(obj);
      t1.save(function(){
        request(app)
        .put('/tasks/' + t1._id.toString())
        .send({_id:t1._id.toString(), title:'Working', dueDate:'2014-02-16', priorityId:p1._id.toString()})
        .end(function(err, res){
          expect(res.body._id.toString()).to.equal(t1._id.toString());
          expect(res.body.title).to.equal('Working');
          done();
        });
      });
    });
  });

  describe('GET /tasks', function(){
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

    it('should find all tasks specified by the query', function(done){
      request(app)
      .get('/tasks?page=3')
      .end(function(err, res){
        expect(res.body.tasks).to.have.length(1);
        done();
      });
    });
  });

});

