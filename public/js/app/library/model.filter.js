/**
 * @name Library Filter Model
 * @module Library
 * @memberOf Model
 */
define([
    'BB',
    'backbone'
],function(BB,Backbone){
    return BB.model_definitions.libraryFilter = Backbone.Model.extend({
        defaults:{
            genre: '',
            name: '',
            notInLibrary: false
        },

        initialize: function(){
            var games = BB.get({collection:'games'});
            this.listenTo(games,'change',this.getTypes);
            this.getTypes();
        },

        getTypes: function(){
            var games = BB.get({collection:'games'});
            var models = games.where({inLibrary:true});

            var uniqueTypes = [];

            var len = models.length;
            var i = 0;
            while(i < len){
                var model = models[i];
                var type = model.get('type');
                if(type && uniqueTypes.indexOf(type) === -1){
                    uniqueTypes.push(type);
                }
                i++;
            }

            this.set({genres:uniqueTypes});
        }
    });
});