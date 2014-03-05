/* jshint expr:true */
'use strict';

process.env.DBNAME = 'note2';
var expect = require('chai').expect;
var Mongo = require('mongodb');
var Note, User, u1;
var userId;

describe('Note', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Note = require('../../app/models/note');
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      u1 = new User({email:'prince@aol.com', password:'1234'});
      u1.hashPassword(function(){
        u1.insert(function(){
          userId = u1._id.toString();
          done();
        });
      });
    });
  });

  describe('new', function(){
    it('should create a new Note object', function(){
      var n1 = new Note({title:'Node Note',
                         body:'Sample Text',
                         dateCreated:'2014-03-05',
                         tags:'homework, prog, code',
                         userId:u1._id.toString()});
      expect(n1).to.be.instanceof(Note);
      expect(n1.title).to.equal('Node Note');
      expect(n1.body).to.equal('Sample Text');
      expect(n1.dateCreated).to.be.instanceOf(Date);
      expect(n1.tags).to.have.length(3);
      expect(n1.userId).to.be.instanceof(Mongo.ObjectID);
    });

    it('notes should have today as the default date and an empty tags array by default', function(){
      var n1 = new Note({title:'Node Note',
                         body:'Sample Text',
                         dateCreated:'',
                         tags:'',
                         userId:u1._id.toString()});
      var today = new Date();
      expect(n1).to.be.instanceof(Note);
      expect(n1.title).to.equal('Node Note');
      expect(n1.body).to.equal('Sample Text');
      expect(n1.dateCreated.toDateString()).to.equal(today.toDateString());
      expect(n1.tags).to.have.length(0);
    });
  });

  describe('#insert', function(done){
    it('should insert a note into the database', function(done){
      var n1 = new Note({title:'Node Note',
                         body:'Sample Text',
                         dateCreated:'2014-03-05',
                         tags:'homework, prog, code',
                         userId:userId});
      n1.insert(function(createdNote){
        expect(createdNote._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  
  describe('.findByUserId', function(done){
    it('should ', function(done){
      var n1 = new Note({title:'Node Note',
                         body:'Sample Text',
                         dateCreated:'2014-03-05',
                         tags:'homework, prog, code',
                         userId:'111111111111111111111111'});
      var n2 = new Note({title:'Node Note',
                         body:'Sample Text',
                         dateCreated:'2014-03-05',
                         tags:'homework, prog, code',
                         userId:userId});
      var n3 = new Note({title:'Node Note',
                         body:'Sample Text',
                         dateCreated:'2014-03-05',
                         tags:'homework, prog, code',
                         userId:userId});

      n1.insert(function(){
        n2.insert(function(){
          n3.insert(function(){
            Note.findByUserId(userId, function(records){
              expect(records).to.have.length(2);
              done();
            });
          });
        });
      });
    });
  });


////////////////////
});
