'use strict';

var _ = require('lodash');
var Lobby = require('../shared/models/Lobby');

var defaultOptions = {
    _id: 'Default',
    server: 1,
    open: true,
    date: new Date(),
    minRank: 0,
    minElo: 0
};


var createLobby = function(options) {
    _.defaults(options, defaultOptions);
    Lobby.findByIdAndUpdate(options._id, options, {upsert: true});
};


var createDefaultLobbies = function() {

    createLobby({
        _id: 'Brutus',
        server: 1,
        open: true,
        date: new Date(),
        minElo: 0
    });


    createLobby({
        _id: 'Masters',
        server: 1,
        open: true,
        date: new Date(),
        minElo: 0
    });
};

module.exports = createDefaultLobbies;