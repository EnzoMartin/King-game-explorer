/**
 * @name Library Container View
 * @module Library
 * @memberOf Views
 */
define([
    'BB',
    'backbone',
    'dust'
],function(BB,Backbone,dust){
    return BB.view_definitions.library = Backbone.View.extend({
        id:'library',

        title:'Your library',

        template:'tpl_games',

        initialize: function(){
            this.subViews = {
                info: {view:'libraryList',model:this.model,collection:this.collection},
                filter: {view:{name:'filter',reset:true},model:this.model,collection:this.collection}
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