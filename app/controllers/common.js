var config = require('../../config/config');
var Helpers = require('../modules/helpers');

/**
 * @name Common
 * @module Controllers
 */
module.exports = {
    /**
     * Load home page with games list
     */
    home: function(req, res){
        res.render('index',Helpers.getFiles(req));
    }
};