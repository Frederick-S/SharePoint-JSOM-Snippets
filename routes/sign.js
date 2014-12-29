'use strict';

var bcrypt = require('bcrypt');
var validator = require('validator');
var eventproxy = require('eventproxy');
var User = require('../models').User;

var signup = {};

signup.get = function (req, res) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('sign/signup', { user: req.session.user });
    }
};

signup.post = function (req, res, next) {
    var body = req.body;
    var name = validator.trim(body.name);
    var email = validator.trim(body.email);
    var password = validator.trim(body.password);
    var passwordConfirmation = validator.trim(body.passwordConfirmation);

    var signupError = 'signupError';
    var ep = new eventproxy();
    ep.fail(next);
    ep.on(signupError, function (error) {
        res.render('sign/signup', { error: error, user: req.session.user });
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

var signin = {};

signin.get = function (req, res) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('sign/signin', { user: req.session.user });
    }
};

signin.post = function (req, res, next) {
    var body = req.body;
    var name = validator.trim(body.name);
    var password = validator.trim(body.password);
    
    var signinError = 'signinError';
    var ep = new eventproxy();
    ep.fail(next);
    ep.on(signinError, function (error) {
        res.render('sign/signin', { error: error, user: req.session.user });
    });
    
    if (name === '' || password === '') {
        return ep.emit(signinError, 'Sign in information is not complete.');
    }
    
    User.getUserByName(name, function (error, user) {
        if (error) {
            return next(error);
        }
        
        if (!user) {
            return ep.emit(signinError, 'Incorrect name or password.');
        }
        
        bcrypt.compare(password, user.password, ep.done(function (equal) {
            if (!equal) {
                return ep.emit(signinError, 'Incorrect name or password.');
            }
            
            req.session.user = user;
            
            return res.redirect('/');
        }));
    });
};

var signout = {};

signout.get = function (req, res) {
    req.session.destroy();
    res.redirect('/');
};

exports.signup = signup;
exports.signin = signin;
exports.signout = signout;