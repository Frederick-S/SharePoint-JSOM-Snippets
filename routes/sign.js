'use strict';

var config = require('../config');
var User = require('../proxy').User;

exports.showSignup = function (req, res) {
    res.render('sign/signup');
};

exports.signup = function (req, res) {
    var body = req.body;
    var name = body.name;
    var email = body.email;
    var password = body.password;
    var passwordConfirmation = body.passwordConfirmation;
    
    
};

exports.showLogin = function (req, res) {
    res.render('sign/login');
};