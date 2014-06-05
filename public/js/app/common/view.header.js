/**
 * Header view
 * @module Header View
 * @listens module:Lib#event:alert
 * @memberOf Views/Common
 */
define([
    'BB',
    'backbone',
    'dust'
], function(BB,Backbone,dust) {
    return BB.view_definitions.header = Backbone.View.extend({
        el: '#header',

        template: 'tpl_header',

        initialize: function(){
            this.body = $('body');
            this.on('alert',this.triggerAlert,this);
            this.render();
            this.setActive(Backbone.history.fragment);
        },

        /**
         * Spawns a new alert
         * @param data {*} Data to pass to the alert
         */
        triggerAlert: function(data){
            var alert = BB.get({view: {name: 'alert',reset: true},model: {name: 'alert',data: data}});
            this.$el.find('.navbar').append(alert.render().el);
        },

        /**
         * Changes the active menu item in the header based off the new route
         * @param href string URL fragment
         */
        setActive: function(href){
            var path = href.split('/')[0] || '/';
            this.$el.find('li').removeClass('active');
            this.$el.find('a[href$="' + path + '"]').parent('li').addClass('active');
        },

        render: function(){
            var _this = this;
            dust.render(this.template, this.model.toJSON(), function(err, out) {
                _this.$el.html(out);
            });
        }
    });
});