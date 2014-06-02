/**
 * Global application models
 * @module Footer Model
 */
define([
    'BB',
    'backbone'
], function(BB,Backbone) {
    return BB.model_definitions.footer = Backbone.Model.extend({
        defaults: {
            year: '0'
        },

        initialize: function(){
            var d = new Date();
            this.set({year: d.getFullYear(),copyright:BB.name});
        }
    });
});