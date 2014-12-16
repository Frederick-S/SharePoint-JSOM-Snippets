'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String }
});

mongoose.model('User', UserSchema);

var User = mongoose.model('User');

exports.getUserByName = function (name, callback) {
    User.findOne({ 'name': name }, callback);
};

exports.getUsersByQuery = function (query, option, callback) {
    User.find(query, '', option, callback);
};

exports.newAndSave = function (user, callback) {
    var u = new User();
    u.name = user.name;
    u.email = user.email;
    u.password = user.password;
    u.save(callback);
};