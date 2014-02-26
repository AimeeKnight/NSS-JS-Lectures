'use strict';
process.env.DBNAME = 'album-test';
var expect = require('chai').expect;
//var Mongo = require('mongodb');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var Album;

before(function(done){
  var initMongo = require('../../app/lib/init-mongo');
  initMongo.db(function(){
    Album = require('../../app/models/album');
    done();
  });
});

beforeEach(function(){
  global.nss.db.dropDatabase(function(err, result){
    var imgdir = __dirname + '/../../app/static/img';
    rimraf.sync(imgdir);
    fs.mkdirSync(imgdir);
    var origfile = __dirname + '/../fixtures/euro.jpg';
    var copyfile = __dirname + '/../fixtures/euro-copy.jpg';
    fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));
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
      expect(a1.taken).to.be.instanceof(Date);
    });
  });

  describe('#addCover', function(){
    it('adds a cover to the album', function(){
      var o = {};
      o.title = 'Euro Vacation';
      o.taken = '2010-03-25';
      var a1 = new Album(o);
      var oldname = __dirname + '/../fixtures/euro-copy.jpg';
      a1.addCover(oldname);
      expect(a1.cover).to.equal(path.normalize(__dirname + '/../../app/static/img/eurovacation/cover.jpg'));
    });
  });

  describe('.insert', function(){
    it('saves an album to the database', function(done){
      var o = {};
      var title = o.title = 'Euro Vacation';
      o.taken = '2010-03-25';
      var a1 = new Album(o);
      a1.insert(title, function(){
        expect(a1._id.toString()).to.have.length(24);
        done();
      });
    });
  });
});

