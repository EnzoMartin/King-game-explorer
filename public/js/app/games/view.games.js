/**
 * @name Games Container View
 * @module Games
 * @memberOf Views
 */
define([
    'BB',
    'backbone',
    'dust'
],function(BB,Backbone,dust){
    return BB.view_definitions.games = Backbone.View.extend({
        id:'games',

        title:'Games',

        template:'tpl_games',

        initialize: function(){
            this.subViews = {
                info: {view:'list',model:this.model,collection:this.collection},
                filter: {view:'filter',model:this.model,collection:this.collection}
            };
        },

        render:function(){
            var view = this;
            dust.render(this.template,{},function(err,out){
                view.$el.html(out);
            });
        }
    });
});