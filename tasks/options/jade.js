var Helpers = require('../../app/modules/helpers');

module.exports = {
    dist: {
        options: {
            processContent: function(content){
                return content.replace(/(t\()(')(.+?)(')(\))/g,'"{%=$3%}"');
            },
            data: Helpers.getFiles({locale:'en',rel:'',fileExt:'.html',params:{}})
        },
        files: {
            // Override from the task
        }
    }
};