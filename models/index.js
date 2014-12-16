'use strict';

var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, function (error) {
    if (error) {
        console.log('Failed to connect to database.');
        
        process.exit(1);
    }
});

var User = require('./user');

exports.User = User;