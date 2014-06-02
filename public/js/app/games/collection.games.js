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
        }
    });
});