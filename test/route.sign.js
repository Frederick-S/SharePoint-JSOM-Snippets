var app = require('../app');
var request = require('supertest')(app);
var should = require('should');

describe('signup', function () {
    var user = 'test' + new Date();
    var email = user + '@test.com';
    var password = 'password';
    
    it('Should visit sign up page', function (done) {
        request.get('/signup')
        .expect(200, function (error, response) {
            response.text.should.containEql('Sign up');
            done(error);
        });
    });
});