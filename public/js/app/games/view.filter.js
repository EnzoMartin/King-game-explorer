/**
 * @name Games Filter Bar View
 * @module Games
 * @memberOf Views
 */
define([
    'BB',
    'backbone',
    'dust'
],function(BB,Backbone,dust){
    return BB.view_definitions.filter = Backbone.View.extend({
        el:'#games-filter',

        template:'tpl_games_filter',

        events:{
            'change #game-library-input': 'toggleNotInLibrary',
            'keyup #game-name': 'filterName',
            'change #game-type': 'filterGenre'
        },

        initialize: function(){
            this.listenTo(this.model,'change:genres',this.render);
        },

        toggleOwn: function(event){
            var id = event.currentTarget.getAttribute('data-id');
            var model = this.collection.get(id);
            if(model){
                model.set({inLibrary:!model.get('inLibrary')});
            }
        },

        toggleNotInLibrary: function(){
            this.model.set({notInLibrary:this.$el.find('#game-library-input').prop('checked')});
        },

        filterGenre: function(event){
            var genre = event.currentTarget.value;
            this.model.set({genre:genre == 'all'? '' : genre});
        },

        filterName: function(event){
            this.model.set({name:event.currentTarget.value.toLowerCase()});
        },

        render:function(){
            var view = this;
            dust.render(this.template,this.model.toJSON(),function(err,out){
                view.$el.html(out);
            });
        }
    });
});