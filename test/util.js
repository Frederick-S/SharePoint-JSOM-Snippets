var app = require('../app');
var request = require('supertest')(app);
var superagent = require('superagent');
var agent = superagent.agent();
var name = 'testuser' + (+new Date());
var account = {
    name: name,
    email: name + '@test.com',
    password: 'password',
    passwordConfirmation: 'password'
};

exports.signup = function (request, done) {
    request.post('/signup')
        .send(account)
        .end(function (error, response) {
            if (error) {
                throw error;
            }
            
            agent.saveCookies(response);
            done(agent);
        });
}