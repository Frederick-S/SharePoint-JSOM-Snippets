'use strict';

var config = require('../config');
var User = require('../proxy').User;

exports.signup = function (req, res, next) {
    var body = req.body;
    var name = body.name;
    var email = body.email;
    var password = body.password;
    var rePassword = body.rePassword;
    
    
};