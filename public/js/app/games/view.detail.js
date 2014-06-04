/**
 * @name Game Detail View
 * @module Games
 * @memberOf Views
 */
define([
    'BB',
    'backbone',
    'dust'
],function(BB,Backbone,dust){
    return BB.view_definitions.detail = Backbone.View.extend({
        id:'game-detail',

        title: function(){
            return this.model.get('name')
        },

        template:'tpl_game_info',

        events:{
            'click .toggle-own' :'toggleOwn'
        },

        toggleOwn: function(){
            this.model.set({inLibrary:!this.model.get('inLibrary')});
        },

        initialize: function(){
            this.listenTo(this.model,'change',this.render);
        },

        render:function(){
            var view = this;
            dust.render(this.template,this.model.toJSON(),function(err,out){
                view.$el.html(out);
            });
        }
    });
});