var app = require('../app');
var request = require('supertest')(app);
var should = require('should');

var name = 'TestUser' + (+new Date());
var email = name + '@test.com';
var password = 'password';

describe('Route: sign up', function () {
    it('Should visit sign up page', function (done) {
        request.get('/signup')
            .expect(200, function (error, response) {
                response.text.should.containEql('Sign up');
                done(error);
            });
    });
    
    it('Should return error message: Sign up information is not complete.', function (done) {
        request.post('/signup')
            .send({
                name: name,
                email: email,
                password: password,
                passwordConfirmation: ''
            })
            .expect(200, function (error, response) {
                response.text.should.containEql('Sign up information is not complete.');
                done();
            });
    });
    
    it('Should return error message: The E-mail address is invalid.', function (done) {
        request.post('/signup')
            .send({
                name: name,
                email: 'abc',
                password: password,
                passwordConfirmation: password
            })
            .expect(200, function (error, response) {
                response.text.should.containEql('The E-mail address is invalid.');
                done();
            });
    });
    
    it('Should return error message: Password doesn\'t match the confirmation.', function (done) {
        request.post('/signup')
            .send({
                name: name,
                email: email,
                password: password,
                passwordConfirmation: 'abc'
            })
            .expect(200, function (error, response) {
                response.text.should.containEql('Password doesn\'t match the confirmation.');
                done();
            });
    });
    
    it('Should sign up successfully and redirect to /', function (done) {
        request.post('/signup')
            .send({
                name: name,
                email: email,
                password: password,
                passwordConfirmation: password
            })
            .expect(200, function (error, response) {
                response.text.should.containEql('Redirecting to /');
                done();
            });
    });
    
    it('Should return error message: The name or the e-mail address is already taken.', function (done) {
        request.post('/signup')
            .send({
                name: name,
                email: email,
                password: password,
                passwordConfirmation: password
            })
            .expect(200, function (error, response) {
                response.text.should.containEql('The name or the e-mail address is already taken.');
                done();
            });
    });
});

describe('Route: sign in', function () {
    it('Should visit sign in page', function (done) {
        request.get('/signin')
            .expect(200, function (error, response) {
                response.text.should.containEql('Sign in');
                done(error);
            });
    });
    
    it('Should return error message: Sign in information is not complete.', function (done) {
        request.post('/signin')
            .send({
                name: name,
                password: ''
            })
            .expect(200, function (error, response) {
                response.text.should.containEql('Sign in information is not complete');
                done(error);
            });
    });
    
    it('Should return error message: Incorrect name or password.', function (done) {
        request.post('/signin')
            .send({
                name: 'abc',
                password: password
            })
            .expect(200, function (error, response) {
                response.text.should.containEql('Incorrect name or password.');
                done(error);
            });
    });
    
    it('Should return error message: Incorrect name or password.', function (done) {
        request.post('/signin')
            .send({
                name: name,
                password: 'abc',
            })
            .expect(200, function (error, response) {
                response.text.should.containEql('Incorrect name or password.');
                done();
            });
    });
    
    it('Should sign in successfully and redirect to /', function (done) {
        request.post('/signin')
            .send({
                name: name,
                password: password,
            })
            .expect(200, function (error, response) {
                response.text.should.containEql('Redirecting to /');
                done();
            });
    });
});

describe('Route: sign out', function () {
    it('Should sign out successfully and redirect to /', function (done) {
        request.get('/signout')
            .expect(302, function (error, response) {
                response.text.should.containEql('Redirecting to /');
                done(error);
            });
    });
});