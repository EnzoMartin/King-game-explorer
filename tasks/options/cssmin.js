module.exports = {
    minify: {
        expand: true,
        cwd: 'public/css/',
        src: ['bootstrap.css'],
        dest: 'public/css/',
        ext: '.min.css'
    }
};