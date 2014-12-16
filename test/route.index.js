var app = require('../app');
var request = require('supertest')(app);
var should = require('should');

describe('Route: index', function () {
    it('Should visit index page', function (done) {
        request.get('/')
            .expect(200, function (error, response) {
                response.text.should.containEql('Home');
                done(error);
            });
    });
});