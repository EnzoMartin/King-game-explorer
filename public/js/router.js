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
             * Initializes the header, binds the route event to update header, and binds the history push on click
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

                    // Set up the history push on click
                    $(window.document).on('click', 'a[href^="/"]:not([target="_blank"])', function(event) {
                        if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
                            var href = this.getAttribute('href');
                            var protocol = this.protocol + '//';

                            if (href.slice(protocol.length) !== protocol) {
                                event.preventDefault();
                                _this.navigate(href, {trigger:true});
                            }
                        }
                    });
                });
            },

            notFound: function(){
                require(['common'],function(){
                    var view = BB.get({view:'notFound'});
                    BBA.render(view);
                });
            },

            /**
             * Generic loading page route
             */
            renderLoading: function(){
                require(['common'],function(){
                    var view = BB.get({view:'loading'});
                    BBA.render(view);
                });
            },

            /**
             * Generic coming soon page
             */
            renderComingSoon: function(){
                require(['common'],function(){
                    var view = BB.get({view:'comingSoon'});
                    BBA.render(view);
                });
            },

            /**
             * Home page
             */
            renderHome: function(){
                require(['home'],function(){
                    var view = BB.get({view:'home'});
                    BBA.render(view);
                });
            },

            routes: {
                ''                     :'renderHome',
                'loading'              :'renderLoading',
                'coming-soon'          :'renderComingSoon',
                '*notFound'            :'notFound' // This should always be last as it handles our 404 page
            }
        });
    });
}(window));