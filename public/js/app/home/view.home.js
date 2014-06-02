/**
 * @module Home View
 * @memberOf Views
 */
define([
    'BB',
    'backbone',
    'dust'
], function(BB,Backbone,dust) {
    return BB.view_definitions.home = Backbone.View.extend({
        id: 'home',

        title: 'Home',

        template: 'tpl_home',

        render: function(){
            var view = this;
            dust.render(this.template, {}, function(err, out) {
                view.$el.html(out);
            });
        }
    });
});