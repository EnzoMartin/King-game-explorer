var pjson = require('../package.json');

var configs = {
    development:{
        root: require('path').normalize(__dirname + '/..'),
        port: 3000,
        googleAnalytics: false,
        loadAllTemplates: true,
        stackError: true,
        prettyHTML: true,
        expressLog: true,
        il8nDebug: false,
        expressLogLevel: 'dev'
    },
    test:{
        root: require('path').normalize(__dirname + '/..'),
        url: process.env.MOCHA_URL || 'http://localhost',
        port: process.env.PORT || 8000,
        reporter: process.env.MOCHA_REPORTER || 'spec',
        loadAllTemplates: false,
        stackError: true,
        prettyHTML: false,
        expressLog: true,
        il8nDebug: false,
        expressLogLevel: 'dev'
    },
    production:{
        root: require('path').normalize(__dirname + '/..'),
        port: process.env.PORT || 80,
        loadAllTemplates: false,
        stackError: false,
        prettyHTML: false,
        expressLog: false,
        il8nDebug: false,
        expressLogLevel: 'dev'
    }
};

/**
 * @module App Config
 * @memberOf App
 * @param environment string
 * @returns {*} Current config options based off environment, including the active environment name
 */
module.exports = function(environment){
    var config = configs[environment] || configs[Object.keys(configs)[0]];
    config.env = environment;
    config.version = pjson.version;
    return module.exports = config;
};