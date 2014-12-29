var app = require('../app');
var request = require('supertest')(app);
var superagent = require('superagent');
var agent = superagent.agent();
var account = {
    name: 'testuser' + (+new Date()),
    email: this.name + '@test.com',
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