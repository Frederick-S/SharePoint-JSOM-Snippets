'use strict';

var validator = require('validator');
var eventproxy = require('eventproxy');
var Course = require('../models').Course;

var create = {};

create.get = function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        res.render('course/create', { user: req.session.user });
    }
};

create.post = function (req, res, next) {
    var body = req.body;
    var name = validator.trim(body.name);
    
    var createCourseError = 'createCourseError';
    var ep = new eventproxy();
    ep.fail(next);
    ep.on(createCourseError, function (error) {
        res.render('course/create', { error: error, user: req.session.user });
    });
    
    if (name === '') {
        return ep.emit(createCourseError, 'Course name is required.');
    }
    
    Course.getByName(name, function (error, course) {
        if (error) {
            return next(error);
        }
        
        if (course) {
            return ep.emit(createCourseError, 'Course name is already taken.');
        }
        
        var user = req.session.user;
    
        if (!user) {
            return ep.emit(createCourseError, 'Please sign in first.');
        }
        
        var now = new Date();
        Course.newAndSave({ id: (+now), name: name, created: now, createdBy: user.name }, function (error, course) {
            if (error) {
                return next(error);
            }
    
            return res.redirect('/course/' + course.id);
        });
    });
};

var view = {};

view.get = function (req, res, next) {
    var id = req.params.id;
    id = parseInt(id);

    Course.getById(id, function (error, c) {
        if (error) {
            next(error);
        }
        
        if (c) {
            res.render('course/course', { user: req.session.user, id: id, name: c.name, created: c.created, createdBy: c.createdBy });
        } else {
            res.render('course/course', { user: req.session.user, id: id });
        }
    });
};

var edit = {};

edit.get = function (req, res, next) {
    var id = req.params.id;
    id = parseInt(id);

    Course.getById(id, function (error, c) {
        if (error) {
            next(error);
        }
        
        if (c) {
            res.render('course/edit', { user: req.session.user, id: id, name: c.name, created: c.created, createdBy: c.createdBy });
        } else {
            res.render('course/edit', { user: req.session.user, id: id });
        }
    });
};

var editDetails = {};

editDetails.get = function (req, res, next) {
    var id = req.params.id;
    id = parseInt(id);

    Course.getById(id, function (error, c) {
        if (error) {
            next(error);
        }
        
        if (c) {
            res.render('course/editdetails', { user: req.session.user, id: id, name: c.name, created: c.created, createdBy: c.createdBy });
        } else {
            res.render('course/editdetails', { user: req.session.user, id: id });
        }
    });
};

exports.create = create;
exports.view = view;
exports.edit = edit;
exports.editDetails = editDetails;