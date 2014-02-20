/* global process, it, describe, beforeEach, afterEach, global, require, before */
/* jshint expr:true */
/*jshint camelcase: false */

'use strict';

process.env.DBNAME = 'todo-test';
var app = require('../../app/app');
var request = require('supertest');
var expect = require('chai').expect;
var Todo;
var Priority;
var priority_id;
var todo_id;

describe('todos', function(){

  before(function(done){
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      Todo = global.nss.Todo;
      Priority = global.nss.Priority;
      done();
    });
  });

  beforeEach(function(done){
    var p1 = new Priority({name:'High', value:'10'});
    var p2 = new Priority({name:'Medium', value:'5'});
    var p3 = new Priority({name:'High', value:'1'});

    var obj1 = {name:'Clean', date: 'March 1, 2014', tags: 'home', priority_id: priority_id};
    var obj2 = {name:'Wash Car', date: 'March 2, 2014', tags: 'car', priority_id: priority_id};
    var obj3 = {name:'Walk Dog', date: 'March 3, 2014', tags: 'pet', priority_id: priority_id};
    var t1 = new Todo(obj1);
    var t2 = new Todo(obj2);
    var t3 = new Todo(obj3);

    p1.save(function(){
      p2.save(function(){
        p3.save(function(err){
          Priority.findByName('Medium', function(foundPriority){
            priority_id = foundPriority._id;
            t1.save(function(){
              t2.save(function(){
                t3.save(function(){
                  todo_id = t1._id.toString();
                  done();
                });
              });
            });
          });
        });
      });
    });
  });

  afterEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('POST /todos', function(){
    it('should create a new priority', function(done){
      request(app)
      .post('/todos')
      .send({name:'Walk Dog', date: 'March 3, 2014', tags: 'pet', priority_id: priority_id})
      .end(function(err, res){
        expect(res.body.name).to.equal('Walk Dog');
        expect(res.body._id).to.have.length(24);
        done();
      });
    });
  });

  describe('GET /todos', function(){
    it('should return all todos in the database', function(done){
      request(app)
      .get('/todos')
      .end(function(err, res){
        expect(res.body.todos).to.have.length(3);
        expect(res.body.todos[0].name).to.be.ok;
        expect(res.body.todos[0]._id).to.have.length(24);
        done();
      });
    });
  });

  describe('GET /todos/3', function(){
    it('should return a specific todo from the database', function(done){

      request(app)
      .get('/todos/' + todo_id)
      .end(function(err, res){
        expect(res.body.name).to.equal('Clean');
        expect(res.body._id).to.equal(todo_id);
        done();
      });
    });
  });

  describe('DELETE /todos/3', function(){
    it('should delete a specific todo from the database', function(done){

      request(app)
      .del('/todos/' + todo_id)
      .end(function(err, res){
        expect(res.body.count).to.equal(1);
        done();
      });
    });
  });

  describe('PUT /todos/3', function(){
    it('should update a specific todo in the database', function(done){
      Todo.findById(todo_id, function(todo){
        todo.name = 'clean carpet';
        todo.date = 'March 1, 2014';
        todo.isComplete = true;
        todo.tags = 'home';
        todo.priority_id = priority_id;

        request(app)
        .put('/todos/' + todo_id)
        .send(todo)
        .end(function(err, res){
          expect(res.body.name).to.equal('clean carpet');
          expect(res.body._id).to.equal(todo_id);
          done();
        });
      });
    });
  });

});

