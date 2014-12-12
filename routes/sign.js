'use strict';

var config = require('../config');
var bcrypt = require('bcrypt');
var validator = require('validator');
var eventproxy = require('eventproxy');
var User = require('../proxy').User;

exports.showSignup = function (req, res) {
    res.render('sign/signup');
};

exports.signup = function (req, res, next) {
    var body = req.body;
    var name = validator.trim(body.name);
    var email = validator.trim(body.email);
    var password = validator.trim(body.password);
    var passwordConfirmation = validator.trim(body.passwordConfirmation);

    var signupError = 'signupError';
    var ep = new eventproxy();
    ep.fail(next);
    ep.on(signupError, function (error) {
        res.render('sign/signup', { error: error });
    });
    
    var isSignupInfoComplete = [name, email, password, passwordConfirmation].every(function (item) {
        return item !== '';
    });
    
    if (!isSignupInfoComplete) {
        return ep.emit(signupError, 'Sign up information is not complete.');
    }
    
    if (!validator.isEmail(email)) {
        return ep.emit(signupError, 'The E-mail address is invalid.');
    }
    
    if (password !== passwordConfirmation) {
        return ep.emit(signupError, 'Password doesn\'t match the confirmation.');
    }
    
    User.getUsersByQuery({
        '$or': [{ name: name }, { email: email }]
    }, {}, function (error, users) {
        if (error) {
            return next(error);
        }
        
        if (users.length > 0) {
            return ep.emit(signupError, 'The name or the e-mail address is already taken.');
        }
        
        bcrypt.hash(password, 10, ep.done(function (hashedPassword) {
            User.newAndSave({ name: name, email: email, password: hashedPassword }, function (error, user) {
                if (error) {
                    return next(error);
                }

                req.session.user = user;
                
                return res.redirect('/');
            });
        }));
    });
};

exports.showLogin = function (req, res) {
    res.render('sign/login');
};