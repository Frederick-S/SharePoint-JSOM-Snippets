'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    id: { type: Number },
    name: { type: String },
    created: { type: Date },
    createdBy: { type: String }
});

mongoose.model('Course', CourseSchema);

var Course = mongoose.model('Course');

exports.getById = function (id, callback) {
    Course.findOne({ 'id': id }, callback);
};

exports.getByName = function (name, callback) {
    Course.findOne({ 'name': name }, callback);
};

exports.newAndSave = function (course, callback) {
    var c = new Course();
    c.id = course.id;
    c.name = course.name;
    c.created = course.created;
    c.createdBy = course.createdBy;
    c.save(callback);
};