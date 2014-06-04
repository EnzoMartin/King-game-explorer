/**
 * @name Library List View
 * @module Library
 * @memberOf Views
 */
define([
    'BB',
    'backbone',
    'dust'
],function(BB,Backbone,dust){
    return BB.view_definitions.libraryList = Backbone.View.extend({
        id:'library-list',

        title:'Your Library',

        template:'tpl_library_list',

        events:{
            'click .toggle-own' : 'toggleOwn'
        },

        initialize: function(){
            this.listenTo(this.collection,'change',this.render);
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
            var data = {
                games: this.collection.chain().filter(function(model){return model.get('inLibrary');}).invoke('toJSON').value()
            };

            console.log(data);
            dust.render(this.template,data,function(err,out){
                view.$el.html(out);
            });
        }
    });
});