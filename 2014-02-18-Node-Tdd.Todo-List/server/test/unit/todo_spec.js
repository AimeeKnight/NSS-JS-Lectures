/* global it, describe, beforeEach, global, require, before */
/* jshint expr:true */
/*jshint camelcase: false */
'use strict';

var expect = require('chai').expect;
var Todo;
var Priority;
var priority_id;

describe('Todo', function(){

  before(function(done){
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      Todo = global.nss.Todo;
      Priority = global.nss.Priority;
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      var p1 = new Priority({name:'High', value:'10'});
      var p2 = new Priority({name:'Medium', value:'5'});
      var p3 = new Priority({name:'High', value:'1'});

      p1.save(function(){
        p2.save(function(){
          p3.save(function(err){
            Priority.findByName('Medium', function(foundPriority){
              priority_id = foundPriority._id;
              done();
            });
          });
        });
      });
    });
  });

  describe('new', function(){
    it('should create a new Todo', function(){
      var obj = {name:'Clean', date: 'March 1, 2014', tags: 'home', priority_id: priority_id};
      var t1 = new Todo(obj);

      expect(t1).to.be.instanceof(Todo);
      expect(t1.date).to.be.instanceof(Date);
      expect(t1).to.have.property('name').and.equal('Clean');
      expect(t1.tags).to.have.length(1);
      expect(t1).to.have.property('tags').and.be.ok;
      expect(t1).to.have.property('priority_id').and.equal(priority_id);
    });
  });

  describe('#save', function(){
    it('should save a Todo object into the database', function(done){
      var obj = {name:'Clean', date: 'March 1, 2014', tags: 'home', priority_id: priority_id};
      var t1 = new Todo(obj);

      t1.save(function(err){
        expect(err).to.be.null;
        expect(t1).to.be.instanceof(Todo);
        expect(t1.date).to.be.instanceof(Date);
        expect(t1).to.have.property('name').and.equal('Clean');
        expect(t1).to.have.property('priority_id').and.equal(priority_id);
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('should return all Todos in the datbase', function(done){
      var obj1 = {name:'Clean', date: 'March 1, 2014', tags: 'home', priority_id: priority_id};
      var obj2 = {name:'Wash Car', date: 'March 2, 2014', tags: 'car', priority_id: priority_id};
      var obj3 = {name:'Walk Dog', date: 'March 3, 2014', tags: 'pet', priority_id: priority_id};
      var t1 = new Todo(obj1);
      var t2 = new Todo(obj2);
      var t3 = new Todo(obj3);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findAll(function(todos){
              expect(todos).to.have.length(3);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findAll', function(){
    it('should return all Todos in the database with a specifies skip and limit', function(done){
      var obj1 = {name:'Clean', date: 'March 1, 2014', tags: 'home', priority_id: priority_id};
      var obj2 = {name:'Wash Car', date: 'March 2, 2014', tags: 'car', priority_id: priority_id};
      var obj3 = {name:'Walk Dog', date: 'March 3, 2014', tags: 'pet', priority_id: priority_id};
      var obj4 = {name:'Laundry', date: 'March 4, 2014', tags: 'home', priority_id: priority_id};
      var obj5 = {name:'Workout', date: 'March 5, 2014', tags: 'fitness', priority_id: priority_id};
      var obj6 = {name:'Oil Change', date: 'March 6, 2014', tags: 'car', priority_id: priority_id};
      var t1 = new Todo(obj1);
      var t2 = new Todo(obj2);
      var t3 = new Todo(obj3);
      var t4 = new Todo(obj4);
      var t5 = new Todo(obj5);
      var t6 = new Todo(obj6);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            t4.save(function(){
              t5.save(function(){
                t6.save(function(){
                  Todo.findAll(function(todos){
                    expect(todos).to.have.length(4);
                    done();
                  }, {page:1, limit:4});
                });
              });
            });
          });
        });
      });
    });
  });

  describe('.findById', function(){
    it('should find the todo by its id', function(done){
      var obj1 = {name:'Clean', date: 'March 1, 2014', tags: 'home', priority_id: priority_id};
      var obj2 = {name:'Wash Car', date: 'March 2, 2014', tags: 'car', priority_id: priority_id};
      var obj3 = {name:'Walk Dog', date: 'March 3, 2014', tags: 'pet', priority_id: priority_id};
      var t1 = new Todo(obj1);
      var t2 = new Todo(obj2);
      var t3 = new Todo(obj3);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            var todo_id = t2._id.toString();
            Todo.findById(todo_id, function(foundTodo){
              expect(foundTodo).to.be.instanceof(Todo);
              expect(foundTodo._id.toString()).to.equal(todo_id);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByComplete', function(){
    it('should filter todos by either true of false', function(done){
      var obj1 = {name:'Clean', date: 'March 1, 2014', tags: 'home', priority_id: priority_id};
      var obj2 = {name:'Wash Car', date: 'March 2, 2014', tags: 'car', priority_id: priority_id};
      var obj3 = {name:'Walk Dog', date: 'March 3, 2014', tags: 'pet', priority_id: priority_id};
      var t1 = new Todo(obj1);
      var t2 = new Todo(obj2);
      var t3 = new Todo(obj3);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByComplete(false, function(todos){
              expect(todos).to.have.length(3);
              expect(todos[0].name).to.equal('Clean');
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByPriority', function(){
    it('should filter todos by their priority', function(done){
      var obj1 = {name:'Clean', date: 'March 1, 2014', tags: 'home', priority_id: priority_id};
      var obj2 = {name:'Wash Car', date: 'March 2, 2014', tags: 'car', priority_id: priority_id};
      var obj3 = {name:'Walk Dog', date: 'March 3, 2014', tags: 'pet', priority_id: priority_id};
      var t1 = new Todo(obj1);
      var t2 = new Todo(obj2);
      var t3 = new Todo(obj3);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByPriority(priority_id, function(todos){
              expect(todos).to.have.length(3);
              expect(todos[2].name).to.deep.equal('Walk Dog');
              done();
            });
          });
        });
      });
    });
  });


  describe('.findByTag', function(){
    it('should filter todos by their tag', function(done){
      var obj1 = {name:'Clean', date: 'March 1, 2014', tags: 'home', priority_id: priority_id};
      var obj2 = {name:'Wash Car', date: 'March 2, 2014', tags: 'car', priority_id: priority_id};
      var obj3 = {name:'Walk Dog', date: 'March 3, 2014', tags: 'pet', priority_id: priority_id};
      var t1 = new Todo(obj1);
      var t2 = new Todo(obj2);
      var t3 = new Todo(obj3);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByTag('home', function(todos){
              expect(todos).to.have.length(1);
              expect(todos[0].name).to.deep.equal('Clean');
              done();
            });
          });
        });
      });
    });
  });

  describe('.deleteById', function(){
    it('should delete the todo by its id from the datbase', function(done){
      var obj1 = {name:'Clean', date: 'March 1, 2014', tags: 'home', priority_id: priority_id};
      var obj2 = {name:'Wash Car', date: 'March 2, 2014', tags: 'car', priority_id: priority_id};
      var obj3 = {name:'Walk Dog', date: 'March 3, 2014', tags: 'pet', priority_id: priority_id};
      var t1 = new Todo(obj1);
      var t2 = new Todo(obj2);
      var t3 = new Todo(obj3);

      t1.save(function(){
        t2.save(function(){
          var id = t2._id.toString();
          t3.save(function(){
            Todo.deleteById(id, function(numberRemoved){
              Todo.findById(id, function(foundTodo){
                expect(numberRemoved).to.equal(1);
                expect(foundTodo).to.be.null;
                done();
              });
            });
          });
        });
      });
    });
  });

});
