/**
 * Backbone router
 * @module Backbone Router
 * @memberOf Backbone
 */
(function(window){
    define([
        'BB',
        'backbone',
        'jquery',
        'BBA',
        'router'
    ], function(BB,Backbone,$,BBA) {
        return Backbone.Router.extend({
            /**
             * Initializes the header/footer, binds the route event to update header, and binds the history push on click
             */
            initialize: function(){
                var _this = this;

                require(['common'],function(){
                    // Load header and footer views
                    var header = BB.get({view:'header',model:'header'});
                    var footer = BB.get({view:'footer',model:'footer'});

                    // Set up the bind to update the header active links
                    _this.on('route',function(){
                        header.setActive(Backbone.history.fragment);
                    });

                    // Can't use history pushstate if we're not being served from a server due to security restrictions in the browser
                    if(window.location.origin != 'file://'){
                        // Set up the history push on click
                        $(window.document).on('click', 'a:not([href^="http"],[target="_blank"])', function(event) {
                            if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
                                var href = this.getAttribute('href');
                                var protocol = this.protocol + '//';

                                if (href.slice(protocol.length) !== protocol) {
                                    event.preventDefault();
                                    _this.navigate(href, {trigger:true});
                                }
                            }
                        });
                    }
                });
            },

            /**
             * 404 page
             */
            notFound: function(){
                require(['common'],function(){
                    var view = BB.get({view:'notFound'});
                    BBA.render(view);
                });
            },

            /**
             * Games list view
             */
            renderGames: function(){
                require(['games'],function(){
                    var view = BB.get({view:'list',collection:'games'});
                    BBA.render(view);
                });
            },

            /**
             * Single game view
             * @param id
             */
            renderGame: function(id){
                var _this = this;
                require(['games'],function(){
                    var collection = BB.get({collection:'games'});
                    var model = collection.get(id.replace('.html',''));
                    if(!model){
                        _this.notFound();
                    } else {
                        var view = BB.get({view:{name:'detail',reset:true},model:model,collection:collection});
                        BBA.render(view);
                    }
                });
            },

            /**
             * User's library
             */
            renderLibrary: function(){
                require(['games','library'],function(){
                    var view = BB.get({view:'libraryList',collection:'games'});
                    BBA.render(view);
                });
            },

            routes: {
                // Support local file view
                'index.html'           :'renderGames',
                'library.html'         :'renderLibrary',

                ''                     :'renderGames',
                'library'              :'renderLibrary',
                ':game'                :'renderGame'
            }
        });
    });
}(window));