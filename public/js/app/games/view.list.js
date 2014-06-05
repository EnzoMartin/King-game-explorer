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
        el:'#games-list',

        template:'tpl_games_list',

        events:{
            'click .toggle-own' : 'toggleOwn'
        },

        initialize: function(){
            this.listenTo(this.collection,'change',this.render);
            this.listenTo(this.model,'change',this.render);
        },

        toggleOwn: function(event){
            var id = event.currentTarget.getAttribute('data-id');
            var model = this.collection.get(id);
            if(model){
                model.set({inLibrary:!model.get('inLibrary')});
            }
        },

        render:function(){
            var view = this;
            var data = this.model.toJSON();

            data.games = this.collection.chain().filter(function(model){
                var match = true;

                if(data.name){
                    match = model.get('name').toLowerCase().indexOf(data.name) !== -1;
                    if(!match) return false;
                }

                if(data.genre){
                    match = model.get('type') == data.genre;
                    if(!match) return false;
                }

                if(data.notInLibrary){
                    match = !model.get('inLibrary');
                }

                return match;
            }).invoke('toJSON').value();

            dust.render(this.template,data,function(err,out){
                view.$el.html(out);
            });
        }
    });
});