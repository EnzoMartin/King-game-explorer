/**
 * @name buildApp
 * @desc Builds the application for offline use
 */
module.exports = function(grunt){
    grunt.registerTask('buildApp',function(){
        var tasks = [
            'buildJSON',
            'makeBundles'
        ];

        grunt.task.run(tasks);
    });
};