var app = require('../app');
var request = require('supertest')(app);
var should = require('should');

describe('Route: error', function () {
    it('Should return Not Found error', function (done) {
        request.get('/aaa')
            .expect(404, function (error, response) {
                response.text.should.containEql('Not Found');
                done(error);
            });
    });
});