var config = require('../../config/config');
var Helpers = require('../modules/helpers');
var http = require('http');
var cheerio = require('cheerio');
var Q = require('q');

/**
 * @name Games
 * @module Controllers
 */
module.exports = {
    /**
     * Load games list page
     * @param req {*}
     * @param res {*}
     */
    list: function(req, res){
        res.render('index',Helpers.getFiles(req));
    },

    /**
     * Load the user's library
     * @param req
     * @param res
     */
    library: function(req, res){
        res.render('library',Helpers.getFiles(req));
    },

    /**
     * Load the game detail page
     * @param req {*}
     * @param res {*}
     */
    view: function(req, res){
        res.render('detail',Helpers.getFiles(req));
    },

    /**
     * Fetches all game information from the internet
     * @param games
     * @param callback
     * @param [locale]
     */
    fetchAllGames: function(games,callback,locale){
        var queue = [];

        games.forEach(function(game){
            queue.push(Helpers.makePromise(module.exports.fetchGame,[game.short,game.url,locale || 'en']));
        });

        Q.allSettled(queue).spread(function(){
            var i = 0;
            var len = arguments.length;
            while(i < len){
                var values = arguments[i].value;
                var keys = Object.keys(values);
                var length = keys.length;
                var j = 0;
                while(j < length){
                    var key = keys[j];
                    games[i][key] = values[key];
                    j++;
                }
                i++;
            }

            callback(null,games);
        });
    },

    /**
     * Loads the game data from the internet for description, background, etc.
     * @param short
     * @param url
     * @param locale
     * @param callback
     */
    fetchGame: function(short,url,locale,callback){
        var options = {
            host: 'www.king.com',
            port: 80,
            path: url
        };

        http.get(options,function(res) {
            if(res.headers.location){
                var loc = res.headers.location.replace('http://','').split('.com');
                var game = {
                    host: loc[0] + '.com',
                    port: 80,
                    path: loc[1] + '?language=' + locale,
                    'user-agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2017.2 Safari/537.36'
                };

                http.get(game,function(res){
                    var html = '';
                    res.on('data',function(chunk){
                        html += chunk;
                    });

                    res.on('end',function(){
                        var $ = cheerio.load(html);
                        var $container = $('#game_open_opensite');
                        var $main = $('[id^=gameInfo_]');
                        var data = {};

                        if(typeof $('body').attr('id') === 'undefined'){
                            data = {
                                register: true,
                                description: $('#gameFocus').find('p').text()
                            }
                        } else {
                            $main.find('#kingOpenGameInstruction').nextAll().remove();

                            data = {
                                register: false,
                                description: $main.html(),
                                css: $container.find('section.tournamentList').css(),
                                type: $container.find('.gameBreadCrumb li').eq(1).find('a').text(),
                                playBtn: $('#playBtn').attr('href')
                            };



                            if(!data.playBtn){
                                data.signupBtn = $main.find('.kingBtn.big_button').attr('href');
                            }

                            if(data.css.background){
                                data.css.background = data.css.background.replace('-o-linear-gradient','linear-gradient').replace('top','to top');
                            }

                            data.short = short;
                        }

                        callback(null,data);
                    });
                }).on('error',function(err) {
                    callback(err,null);
                });
            }
        }).on('error',function(err) {
            callback(err,null);
        });
    }
};