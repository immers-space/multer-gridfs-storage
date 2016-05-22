var express = require('express');
var chai = require('chai');
var expect = chai.expect;
var GridFsStorage = require('../index');
var setting = require('./utils/settings');
var request = require('supertest');
var multer = require('multer');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
const GridFS = require('gridfs-stream');

var app = express();

var files = ['sample1.jpg', 'sample2.jpg'].map(function (file) {
    return __dirname + '/attachments/' + file;
});

describe('GridFS storage', function () {
    var result,
        db, gfs;

    before(function (done) {
        MongoClient.connect(setting.mongoUrl(), function (err, database) {
            if (err) {
                return done(err);
            }

            db = database;
            gfs = GridFS(db, mongo);

            var storageUrl = GridFsStorage({
                url: setting.mongoUrl()
            });

            var storageGfs = GridFsStorage({
                gfs: gfs
            });

            var uploadUrl = multer({
                storage: storageUrl
            });

            var uploadGfs = multer({
                storage: storageGfs
            });

            app.post('/url', uploadUrl.array('photos', 2), function (req, res) {
                res.send({headers: req.headers, files: req.files});
            });

            app.post('/gfs', uploadGfs.array('photos', 2), function (req, res) {
                res.send({headers: req.headers, files: req.files});
            });

            done();
        });
    });

    describe('url created instance', function () {
        beforeEach(function (done) {
            request(app)
                .post('/url')
                .attach('photos', files[0])
                .attach('photos', files[1])
                .end(function (err, res) {
                    result = res.body;
                    done();
                });
        });

        it('should store the files on upload', function () {
            expect(result.files).to.have.length(2);
        });

        it('should use a 16 bytes long in hexadecimal format naming by default', function () {
            expect(result).to.have.deep.property('files[0].filename').that.matches(/[a-f0-9]{32}/);
            expect(result).to.have.deep.property('files[1].filename').that.matches(/[a-f0-9]{32}/);
        });

        it('should have a metadata property with the value null', function () {
            expect(result).to.have.deep.property('files[0].metadata').that.is.null;
            expect(result).to.have.deep.property('files[1].metadata').that.is.null;
        });

        it('should have a _id property with the stored file id', function () {
            expect(result).to.have.deep.property('files[0]._id').that.is.a('string');
            expect(result).to.have.deep.property('files[1]._id').that.is.a('string');
        });

        it('should have a file property with the stored file info', function () {
            expect(result).to.have.deep.property('files[0].file')
                .that.have.all.keys(['chunkSize', 'contentType', 'filename', 'length', 'md5', 'uploadDate', '_id']);
            expect(result).to.have.deep.property('files[1].file')
                .that.have.all.keys(['chunkSize', 'contentType', 'filename', 'length', 'md5', 'uploadDate', '_id']);
        });

        afterEach(function () {
            db.collection('fs.files').deleteMany({})
                .then(function () {
                    return db.collection('fs.chunks').deleteMany({});
                })
                .then(function () {
                    done();
                })
                .catch(function (err) {
                    done(err);
                });
        });
    });

    describe('gfs created instance', function () {
        beforeEach(function (done) {
            request(app)
                .post('/gfs')
                .attach('photos', files[0])
                .attach('photos', files[1])
                .end(function (err, res) {
                    result = res.body;
                    done();
                });
        });

        it('should store the files on upload', function () {
            expect(result.files).to.have.length(2);
        });

        afterEach(function () {
            db.collection('fs.files').deleteMany({})
                .then(function () {
                    return db.collection('fs.chunks').deleteMany({});
                })
                .then(function () {
                    done();
                })
                .catch(function (err) {
                    done(err);
                });
        });
    });

    after(function (done) {
        db.dropDatabase(done);
    });

});



