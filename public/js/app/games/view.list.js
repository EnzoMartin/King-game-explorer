/**
 * @name Games List View
 * @module Games
 * @memberOf Views
 */
define([
    'BB',
    'backbone',
    'dust'
],function(BB,Backbone,dust){
    return BB.view_definitions.list = Backbone.View.extend({
        id:'games-list',

        title:'Games',

        template:'tpl_games_list',

        events:{
            'click .toggle-own' : 'toggleOwn'
        },

        toggleOwn: function(event){
            var id = event.currentTarget.getAttribute('data-id');
            var model = this.collection.get(id);
            if(model){
                model.set({inLibrary:!model.get('inLibrary')});
            }
        },

        initialize: function(){
            this.listenTo(this.collection,'change',this.render);
        },

        render:function(){
            var view = this;
            dust.render(this.template,{games:this.collection.toJSON()},function(err,out){
                view.$el.html(out);
            });
        }
    });
});