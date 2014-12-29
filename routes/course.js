'use strict';

var create = {};

create.get = function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        res.render('course/create', { user: req.session.user });
    }
};

exports.create = create;