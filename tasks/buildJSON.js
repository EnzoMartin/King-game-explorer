var fs = require('fs');
var Games = require('../app/controllers/games');
var gamesJSON = require('../public/json/games.json').games;

/**
 * @name Crawl for languages
 * @desc 
 */
module.exports = function(grunt){
    grunt.registerTask('buildJSON','Crawl all the languages',function(){
        var done = this.async();
        var languages = fs.readdirSync('locales');
        var count = 0;
        var len = languages.length;

        console.log(len + ' languages to fetch')
        languages.forEach(function(lang){
            var locale = lang.substr(0,2);
            Games.fetchAllGames(gamesJSON,function(err,data){
                if(err){
                    throw new Error(err);
                } else {
                    count++;
                    console.log('done fetching ' + locale + ' - ' + count + ' of ' + len);
                    fs.writeFile('public/json/' + locale + '-games-full.json',JSON.stringify(data));

                    if(count == len){
                        console.log('done, continuing');
                        done();
                    }
                }
            },locale);
        });
    });
};