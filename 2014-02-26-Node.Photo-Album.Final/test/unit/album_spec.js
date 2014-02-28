'use strict';
process.env.DBNAME = 'album-test';
var expect = require('chai').expect;
//var Mongo = require('mongodb');
var fs = require('fs');
var exec = require('child_process').exec;
var Album;

before(function(done){
  var initMongo = require('../../app/lib/init-mongo');
  initMongo.db(function(){
    Album = require('../../app/models/album');
    done();
  });
});

beforeEach(function(done){
  var testdir = __dirname + '/../../app/static/img/test*';
  var cmd = 'rm -rf ' + testdir;

  exec(cmd, function(){
    var origfile = __dirname + '/../fixtures/euro.jpg';
    var copyfile = __dirname + '/../fixtures/euro-copy.jpg';
    var copyfile2 = __dirname + '/../fixtures/euro-copy2.jpg';
    var copyfile3 = __dirname + '/../fixtures/euro-copy3.jpg';
    fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));
    fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile2));
    fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile3));
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });
});

describe('Album', function(){
  describe('new', function(){
    it('creates a new album object', function(){
      var o = {};
      o.title = 'Euro Vacation';
      o.taken = '2010-03-25';
      var a1 = new Album(o);
      expect(a1).to.be.instanceof(Album);
      expect(a1.title).to.equal('Euro Vacation');
      expect(a1.photos).to.have.length(0);
      expect(a1.taken).to.be.instanceof(Date);
    });
  });

  describe('#addCover', function(){
    it('adds a cover to the album', function(){
      var o = {};
      o.title = 'Test Euro Vacation';
      o.taken = '2010-03-25';
      var a1 = new Album(o);
      var oldname = __dirname + '/../fixtures/euro-copy.jpg';
      a1.addCover(oldname);
      expect(a1.cover).to.equal('/img/testeurovacation/cover.jpg');
    });
  });

  describe('#addPhoto', function(){
    it('adds a photo to the album', function(done){
      var o = {};
      o.title = 'Test Euro Vacation';
      o.taken = '2010-03-25';
      var a1 = new Album(o);
      var oldname = __dirname + '/../fixtures/euro-copy.jpg';
      a1.addCover(oldname);
      var oldname2 = __dirname + '/../fixtures/euro-copy2.jpg';
      a1.addPhoto(oldname2, 'euro-copy.jpg', function(){
        expect(a1.photos[0]).to.equal('/img/testeurovacation/euro-copy.jpg');
        expect(a1.photos).to.have.length(1);
        done();
      });
    });
  });

  describe('#addPhoto', function(){
    var a1;

    beforeEach(function(done){
      a1 = new Album({title:'Test A', taken:'2012-03-25'});
      var oldname = __dirname + '/../fixtures/euro-copy1.jpg';
      a1.addCover(oldname);
      a1.insert(function(){
        done();
      });
    });:w


  describe('#insert', function(){
    it('saves an album to the database', function(done){
      var o = {};
      o.taken = '2010-03-25';
      o.title = 'Euro Vacation';
      var a1 = new Album(o);
      var oldname = __dirname + '/../fixtures/euro-copy.jpg';
      a1.addCover(oldname);
      a1.insert(function(){
        expect(a1._id.toString()).to.have.length(24);
        done();
      });
    });
  });

  describe('#update', function(){
    it('updates an album to the database', function(done){
      var o = {};
      o.taken = '2010-03-25';
      o.title = 'Test Euro Vacation';
      var a1 = new Album(o);
      var oldname = __dirname + '/../fixtures/euro-copy.jpg';
      a1.addCover(oldname);
      a1.insert(function(){
        a1.taken = new Date('2011-03-25');
        a1.update(function(){
          expect(a1.taken).to.be.instanceof(Date);
          done();
        });
      });
    });
  });

  describe('Find Methods', function(){
    //var a1;

    beforeEach(function(done){
      var a1 = new Album({title:'A', taken:'2012-03-25'});
      var a2 = new Album({title:'B', taken:'2012-03-26'});
      var a3 = new Album({title:'C', taken:'2012-03-27'});

      a1.insert(function(){
        a2.insert(function(){
          a3.insert(function(){
            done();
          });
        });
      });
    });

    describe('.findAll', function(){
      it('finds all the albums in the database', function(done){
        Album.findAll(function(albums){
          expect(albums).to.have.length(3);
          done();
        });
      });
    });

    describe('.findById', function(){
      it('finds an album based on the album id', function(done){
        var a4 = new Album({title:'C', taken:'2012-03-27'});
        a4.insert(function(){
          var id = a4._id;
          Album.findById(a4._id.toString(), function(album){
            expect(album._id.toString()).to.have.length(24);
            expect(album._id.toString()).to.equal(id.toString());
            done();
          });
        });
      });
    });
  });
});

