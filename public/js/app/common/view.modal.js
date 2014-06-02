/**
 * Common modal view
 * @module Modal
 * @memberOf Views/Common
 */
define([
    'BB',
    'backbone',
    'dust'
], function(BB,Backbone,dust) {
    return BB.view_definitions.modal = Backbone.View.extend({
        events: {
            'click .btn-confirm': 'confirm'
        },

        id: 'confirm-dialogue',

        template: 'tpl_confirm_dialogue',

        initialize: function(){
            this.render();
        },

        /**
         * Confirmation event triggers hiding
         */
        confirm: function(){
            var modal = this;
            this.$modal.on('hidden',function(){
                if(typeof modal.model.callback !== 'undefined'){
                    modal.model.callback();
                }
                modal.model.destroy();
                modal.remove();
            });
            this.$modal.modal('hide');
        },

        render: function(){
            var _this = this;
            dust.render(this.template, this.model.toJSON(), function(err, out) {
                _this.$el.html(out);
            });
            this.$modal = this.$el.find('#modal');
            return this;
        }
    });
});