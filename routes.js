'use strict';

var express = require('express');
var index = require('./routes/index');
var sign = require('./routes/sign');

var router = express.Router();

// Home page
router.get('/', index.index);

// Sign up
router.get('/signup', sign.showSignup);
router.post('/signup', sign.signup);

// Sign in
router.get('/signin', sign.showSignin);
router.post('/signin', sign.signin);

// Sign out
router.get('/signout', sign.signout);

module.exports = router;