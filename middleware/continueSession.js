'use strict';

var session = require('../shared/redisSession');


module.exports = function(req, res, next) {

    req.session = req.session || {};

    if(!req.headers || !req.headers['session-token']) {
        return next();
    }

    var token = req.headers['session-token'];
    return session.get(token, function(err, result) {
        if(!err && result) {
            req.session = result;
        }
        next();
    });
};