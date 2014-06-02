var pjson = require('../../package.json');
var config = require('../../config/config');
var i18n = require('i18next');

/**
 * @name Express Helpers
 */

// Global objects to store all the files and modules to include
var requireConfig = require('../../config/require')(config.env);

// Specify requirejs URL to load based off the require config
var requireUrl = requireConfig.baseUrl + requireConfig.paths.require + '.js';

// Set the .min extension for CSS for production only
var ext = config.env === 'development'? '' : '.min';

var games = JSON.stringify(require('../../public/json/games.json'));

/**
 * Get base file definitions and global app data to pass to template
 * @param req {*} Express request object
 */
function getFiles(req){
    // Pass all the variables needed for the page render
    return {
        bootstrapped: games,
        lang: 'en',
        loadAllTemplates: config.loadAllTemplates,
        requireUrl: requireUrl,
        ext: ext,
        title: pjson.title,
        headline: pjson.headline,
        requireConfig: requireConfig
    };
}

module.exports = {
    requireConfig: requireConfig,

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
    }
};