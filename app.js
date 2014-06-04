/**
 * @namespace App
 * @desc The main NodeJS application file
 * @type {exports}
 */
var express = require('express');
var fs = require('fs');

// Load configurations
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')(env);

var start = function(callback){
    var games = require('./public/json/games.json');
    // Fetch all the games
    var Games = require('./app/controllers/games');
    var Helpers = require('./app/modules/helpers');

    Games.fetchAllGames(games.games,function(err,games){
        fs.writeFile('public/json/games-full.json',JSON.stringify(games));

        Helpers.games = games;
        Helpers.gamesJSON = JSON.stringify({games:games});

        games.forEach(function(game){
            Helpers.gamesByShort[game.short] = game;
        });

        var app = express();

        // Express settings
        require('./config/express')(app);

        // Express routes
        require('./config/routes')(app);

        // Start
        var http = app.listen(config.port);

        // Start
        if(env == 'development'){
            console.log('Application started on: http://localhost:' + config.port);
        } else {
            console.log('Application started on port:' + config.port);
        }

        if(typeof callback === 'function'){
            callback(app,http);
        }
    });
};

module.exports = {
    start: start
};