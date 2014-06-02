/**
 * Global application models
 * @module Header Model
 */
define([
    'BB',
    'backbone'
], function(BB,Backbone) {
    return BB.model_definitions.header = Backbone.Model.extend({
        defaults: {
            version: '0.0.1',
            name   : ''
        },

        initialize: function(){
            this.set({name: BB.title,version: BB.version});
        }
    });
});