'use strict';

var express = require('express');
var index = require('./routes/index');
var sign = require('./routes/sign');
var course = require('./routes/course');

var router = express.Router();

// Home page
router.get('/', index.index.get);

// Sign up
router.get('/signup', sign.signup.get);
router.post('/signup', sign.signup.post);

// Sign in
router.get('/signin', sign.signin.get);
router.post('/signin', sign.signin.post);

// Sign out
router.get('/signout', sign.signout.get);

// Course
router.get('/course/create', course.create.get);

module.exports = router;