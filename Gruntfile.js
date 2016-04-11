/**
 * Copyright (c) 2016 Jeremy Thomerson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

   var pkg = grunt.file.readJSON('package.json'),
       zipName = grunt.option('zip-name') || (pkg.name + '.zip'),
       config;

   config = {
      zip: {
         include: [ 'index.js', 'src/**/*', 'node_modules/**/*' ],
         dest: 'dist/' + zipName,
      },
   };

   grunt.initConfig({

      pkg: pkg,
      config: config,

      zip: {
         '<%= config.zip.dest %>': [ '<%= config.zip.include %>' ],
      },

   });

   grunt.loadNpmTasks('grunt-zip');

   grunt.registerTask('default', [ 'zip' ]);

};
