/**
 * @name Games Collection
 * @module Games
 * @memberOf Collection
 */
define([
    'BB',
    'backbone'
],function(BB,Backbone){
    return BB.collection_definitions.games = Backbone.Collection.extend({
        model:function(attributes,options){
            return new BB.model_definitions.game(attributes,options);
        },

        initialize: function(){
            var _this = this;
            var savedData = {};

            if(typeof Storage !== 'undefined'){
                savedData = JSON.parse(localStorage.getItem('inLibrary')) || {};
                this.on('change',this.saveStorage,this);
            }

            BB.bootstrapped.games.forEach(function(game){
                game.inLibrary = savedData[game.short];

                _this.add(BB.model_definitions.game.prototype.parse(game));
            });
        },

        saveStorage: function(){
            var models = this.where({'inLibrary':true});
            var data = {};

            var i = 0;
            var len = models.length;
            while(i < len){
                var model = models[i];
                data[model.id] = model.get('inLibrary');
                i++;
            }

            localStorage.setItem('inLibrary',JSON.stringify(data));
        }
    });
});