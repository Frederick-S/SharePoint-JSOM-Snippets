'use strict';

exports.index = function (req, res) {
    res.render('index', { title: 'Memory', user: req.session.user });
};