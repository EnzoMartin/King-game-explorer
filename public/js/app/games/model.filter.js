/**
 * @name Filter Model
 * @module Games
 * @memberOf Model
 */
define([
    'BB',
    'backbone'
],function(BB,Backbone){
    return BB.model_definitions.filter = Backbone.Model.extend({
        defaults:{
            genre: '',
            name: '',
            notInLibrary: false
        },

        initialize: function(){
            var games = BB.get({collection:'games'});
            var types = games.pluck('type');

            var uniqueTypes = [];
            var len = types.length;
            var i = 0;
            while(i < len){
                var type = types[i];
                if(type && uniqueTypes.indexOf(type) === -1){
                    uniqueTypes.push(type);
                }
                i++;
            }

            this.set({genres:uniqueTypes});
        }
    });
});