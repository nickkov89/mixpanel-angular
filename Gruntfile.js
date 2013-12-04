module.exports = function(grunt) {
   'use strict';

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      karma: {
         unit: {
            configFile: 'karma.conf.js',
            singleRun: true
         }
      },

      jshint: {
         all: ['Gruntfile.js', 'src/*.js', 'test/**/*.js']
      },

      uglify: {
         options: {
            preserveComments: 'some',
            report: 'min'
         },
         dist: {
            files: {
               'dist/mixpanel-angular.min.js': ['src/mixpanel-angular.js'],
            }
         }
      },

      clean: ['dist']
   });

   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-karma');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-clean');

   grunt.registerTask('test', ['jshint', 'karma']);
   grunt.registerTask('default', ['jshint', 'karma', 'uglify:dist']);
};
