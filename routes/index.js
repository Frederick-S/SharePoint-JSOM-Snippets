'use strict';

var index = {};

index.get = function (req, res) {
    res.render('index', { title: 'Memory', user: req.session.user });
}

exports.index = index;