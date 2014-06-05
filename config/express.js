var express = require('express');
var i18n = require('i18next');
var config = require('../config/config');
var compress = require('compression');
var logger = require('morgan');

/**
 * @module Express App
 * @param app {*}
 */
module.exports = function(app){
    i18n.init({
        resGetPath: './locales/__lng__/__ns__.json',
        fallbackLng: 'en-US',
        ns: 'server',
        saveMissing: true,
        ignoreRoutes: ['img/', 'public/', 'css/', 'js/'],
        debug: config.il8nDebug
    });

	app.set('showStackError',config.stackError);
	app.use(compress({
        filter: function(req,res){
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    // Set whether to prettify HTML
    app.locals.pretty = config.prettyHTML;

	app.use(express.static(config.root + '/public'));

    // Set the log level
	if(config.expressLog){
        app.use(logger(config.expressLogLevel));
    }

	// Set views path and template engine
	app.set('view options',{layout: false});
	app.set('views',config.root + '/app/views');
	app.set('view engine','jade');

    app.use(i18n.handle);

    // Register our localization
    i18n.registerAppHelper(app);
};