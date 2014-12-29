var app = require('../app');
var request = require('supertest')(app);
var should = require('should');
var util = require('./util');

var agent;
var req;

before(function (done) {
    util.signup(request, function (signupAgent) {
        agent = signupAgent;
        done();
    });
});

describe('Course: create', function () {
    it('Should visit create course page', function (done) {
        req = request.get('/course/create');
        agent.attachCookies(req);
        req.expect(200, function (error, response) {
            response.text.should.containEql('Create a Course');
            done(error);
        });
    });
});