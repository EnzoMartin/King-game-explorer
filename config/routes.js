var config = require('./config');
var Helpers = require('../app/modules/helpers');

// Controllers
var Games = require('../app/controllers/games');

/**
 * @module Express Router
 * @memberOf App
 * @param app {*}
 */
module.exports = function(app){
    // For development, we reload the module list on every refresh
     if(config.env === 'development'){
        app.use(function(req, res, next){
            Helpers.requireConfig = Helpers.requireConfig.getFiles(Helpers.requireConfig);
            next();
        });
     }

    app.route('/')
        .get(Games.list);

    app.route('/library')
        .get(Games.library);

    app.route('/:game')
        .get(Games.view);

    /**
     * Backbone catch-all pass-through route
     */
    if(config.env === 'development'){
        app.use(function(req, res, next){
            if(req.originalUrl.indexOf('js') !== -1){
                if(req.originalUrl.split('/').length == 3){
                    res.send({});
                } else {
                    next();
                }
            } else {
                res.render('index',Helpers.getFiles(req),function(err,html) {
                    if(err) {
                        next(err);
                    } else {
                        res.end(html);
                    }
                });
            }
        });
    } else {
        app.use(function(req, res, next){
             res.format({
                'text/html': function(){
                    res.render('index',Helpers.getFiles(req),function(err,html) {
                        if(err) {
                            next(err);
                        } else {
                            res.end(html);
                        }
                    });
                },
                'application/json': function(){
                    res.status(501);
                    res.send();
                }
            });
        });
    }

    /**
     * Our 500 error page
     */
    if(config.stackError){
        app.use(function(err, req, res, next){
            console.error(err);
            console.trace();
            res.status(500);
            res.format({
                'text/html': function(){
                    var data = Helpers.getFiles(req);
                    data.error = err;
                    res.render('500',data);
                },
                'application/json': function(){
                    res.send({error:err});
                }
            });
        });
    } else {
        app.use(function(err, req, res, next){
            res.status(500);
            res.format({
                'text/html': function(){
                    var data = Helpers.getFiles(req);
                    data.error = err;
                    res.render('500',data);
                },
                'application/json': function(){
                    res.send({error:err});
                }
            });
        });
    }
};