'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        cssmin: {
            css: {
                files: [{
                    expand: true,
                    cwd: 'public/stylesheets/',
                    src: ['*.css'],
                    dest: 'public/stylesheets/',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            js: {
                files: {
                    'public/javascripts/app.min.js': ['public/javascripts/app.js']
                }
            }
        },
        clean: {
            css: ["public/stylesheets/*.min.css"],
            js: ["public/javascripts/*.min.js"]
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/',
                        src: "**",
                        dest: 'public/lib/bootstrap'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery/dist/',
                        src: "**",
                        dest: 'public/lib/jquery'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('css', ['clean:css', 'cssmin:css']);
    grunt.registerTask('js', ['clean:js', 'uglify:js']);
    grunt.registerTask('default', ['clean', 'copy', 'cssmin:css', 'uglify:js']);
};