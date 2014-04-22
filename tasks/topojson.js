/*
 * grunt-topojson
 * https://github.com/mark.dimarco/grunt-topojson
 *
 * Copyright (c) 2014 Mark DiMarco
 * Licensed under the MIT license.
 */

'use strict';

var topojson = require('topojson');
var _ = require('underscore');

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('topojson', 'Convert GeoJSON to TopoJSON', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', ',
      target: this.target
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      var srcLength = src.length;
      var geoJSON = JSON.parse(src);
      /* 
        If an `idProperty` is specified, look for that under the `properties` object.
        Default topojson behavior: `id` property
      */
      if ( !_.isUndefined(options.idProperty) ) {
        options.id = function(d) { 
          return d && d.properties && d.properties[options.idProperty];
        };
      }

      /*
        If `copyProperties` specified, only copy those properties.
        If an empty array is sent, copy no properties.
        If nothing is sent (null, undefined), default to copying all properties.
      */
      if ( _.isArray(options.copyProperties) ) {
        options['property-transform'] = function(properties, key, value) {
          if ( _.contains(options.copyProperties, key)) {
            properties[key] = value;
          }
          return true;
        };
      }
      else {
        options['property-transform'] = function(properties, key, value) {
          properties[key] = value;
          return true;
        };
      }

      /*
        Set the collection name
      */
      var collection = {};
      if ( !_.isUndefined(options.collectionName) ) {
        collection[options.collectionName] = geoJSON;
      }
      else {
        collection[options.target] = geoJSON;
      }

      /*
        Convert GeoJSON to TopoJSON
      */
      var topology = topojson.topology(collection, options);

      var targetLength = JSON.stringify(topology).length;
      // Write the destination file.
      grunt.file.write(f.dest, JSON.stringify(topology));

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
      grunt.log.writeln('Original GeoJSON Size:', ~~(srcLength / 1024), 'KB. ');
      grunt.log.writeln('TopoJSON Size:', ~~(targetLength / 1024), 'KB\n');
    });
  });

};
