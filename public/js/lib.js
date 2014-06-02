/**
 * Library of small useful global functions
 * @module Lib
 */
define([], function(){
    var Lib = {};

    /**
     * Spawns an alert dialogue
     * @param alertData {{title:String,message:String,type:String,static:Boolean}}
     * @example BBA.alert({title:'Title',message:'Secondary text',type:'danger'})
     * @event module:Lib#alert
     */
    Lib.alert = function(alertData){
        var header = this.get({view: {name: 'header'}});
        header.trigger('alert', alertData);
    };

    /**
     * Pops a modal window
     * @param data {*}
     * @param callback function
     * @event module:Lib#modal
     */
    Lib.modal = function(data,callback){
        var footer = this.get({view: {name: 'footer'}});
        footer.trigger('modal', data, callback);
    };

    /**
     * Returns a slug of the input
     * @param text string
     * @returns string
     */
    Lib.slugify = function(text){
        text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
        text = text.replace(/-/gi, "_");
        text = text.replace(/\s/gi, "-");
        return text;
    };

    /**
     * Converts input to it's effective size
     * @param bytes number|string Convert to proper size
     * @returns string
     */
    Lib.bytesToSize = function(bytes){
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Bytes';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    };

    return Lib;
});