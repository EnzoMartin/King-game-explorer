var pjson = require('../../package.json');
var config = require('../../config/config');
var i18n = require('i18next');
var Q = require('q');

/**
 * @name Express Helpers
 */

// Global objects to store all the files and modules to include
var requireConfig = require('../../config/require')(config.env);

// Specify requirejs URL to load based off the require config
var requireUrl = requireConfig.baseUrl + requireConfig.paths.require + '.js';

// Set the .min extension for CSS for production only
var ext = config.env === 'development'? '' : '.min';

var languages = {
    'en-US': 'English',
    'sv-SE': 'Svenska',
    'da-DK': 'Dansk',
    'de-DE': 'Deutsch',
    'es-ES': 'Español',
    'fr-FR': 'Français',
    'it-IT': 'Italiano'
};

/**
 * Get base file definitions and global app data to pass to template
 * @param req {*} Express request object
 */
function getFiles(req){
    // Pass all the variables needed for the page render
    var data = {
        bootstrapped: module.exports.gamesJSON,
        games: module.exports.games,
        rel: typeof req.rel === 'undefined'? '/' : req.rel,
        fileExt: typeof req.fileExt === 'undefined'? '' : req.fileExt,
        lang: req.locale || 'en',
        loadAllTemplates: config.loadAllTemplates,
        requireUrl: requireUrl,
        ext: ext,
        languages: languages,
        title: pjson.title,
        headline: pjson.headline,
        requireConfig: requireConfig
    };

    if(req.params.game){
        data.game = module.exports.gamesByShort[req.params.game]
    }

    return data;
}

module.exports = {
    requireConfig: requireConfig,

    games: {},

    gamesJSON: '{}',

    gamesByShort: {},

    getFiles: getFiles,

    /**
     * Handle sending the index page or a JSON response, handling the error code
     * @param err {*} Error object
     * @param req {*} Express request object
     * @param res {*} Express response object
     * @param key string Name of response key
     * @param data {*} Data blob
     */
    sendResponse: function(err,req,res,key,data){
        res.format({
            'text/html': function(){
                var out = {};
                if(err){
                    out = {error:err};
                } else {
                    out[key] = data;
                }
                res.render('index',getFiles(req,out));
            },
            'application/json': function(){
                if(err){
                    res.status(500);
                }
                res.send(data || err);
            }
        });
    },

    /**
     * Makes a promise and returns it
     * @param method
     * @param [params]
     * @returns {promise}
     */
    makePromise: function(method,params){
        var d = Q.defer();
        var args = [];

        if(typeof params !== 'object'){
            args.push(params);
        } else {
            args = params;
        }

        args.push(function(err, data){
            d.resolve(err || data);
        });
        method.apply(method,args);

        return d.promise;
    }
};