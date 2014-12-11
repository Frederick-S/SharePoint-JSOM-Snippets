'use strict';

var express = require('express');
var index = require('./routes/index');
var sign = require('./routes/sign');

var router = express.Router();

// Home page
router.get('/', index.index);

// Sign up
router.get('/signup', sign.showSignup);
router.post('/signup', sign.signup)

// Log in
router.get('/login', sign.showLogin);

module.exports = router;