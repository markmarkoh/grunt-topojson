/*
 * grunt-topojson
 * https://github.com/mark.dimarco/grunt-topojson
 *
 * Copyright (c) 2014 Mark DiMarco
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    topojson: {
      world: {
        files: {
          'tmp/simple.topo.json': ['test/fixtures/geojson.json'],
          'tmp/world.topo.json': ['test/fixtures/world.geo.json'],
        },
      },
      custom_options: {
        options: {
          idProperty: 'name',
          copyProperties: [],
          quantization: 1e4,
          collectionName: 'custom'
        },
        files: {
          'tmp/world.topo.custom.json': ['test/fixtures/world.geo.json'],
          'tmp/simple.topo.custom.json': ['test/fixtures/geojson.json'],
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'topojson', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
