/*
 * grunt-cli
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-init/blob/master/LICENSE-MIT
 */

'use strict';

var smushit = require('node-smushit');

var jupianyiJS = ["E:/app/tencentapp1/js/site.js","E:/app/tencentapp1/js-souce/*.js"];
var jupianyiCSS = ["E:/app/tencentapp1/css/site.css","E:/app/tencentapp1/css-souce/*.css"]; 
var jupianyiIMG  = 'E:/app/tencentapp1/img/';         

module.exports = function(grunt) {
  // Project configuration.
  var config = {
    jshint: {
      all: [
        'Gruntfile.js',
        'lib/**/*.js',
        'bin/*',
      ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },
    cssmin: {
      jupianyi: {
        files: {}
      }
    },
    imagemin: {                          // Task
      dist: {                            // Target
        options: {                       // Target options
          optimizationLevel: 3
        },
        files: {                         // Dictionary of files
          /*'dist/img/': 'test/img/*.png'*/
        }
      }
    },
    clean: ["dist/img/"],
    uglify: {
      jupianyi: {
        files: {}
      }
    },
    watch: {
      scripts: {
        files: [jupianyiCSS[1],jupianyiJS[1]],
        tasks: ['jupianyi'],
        options: {
          interrupt: true
        }
      }
    }
  }

    config.uglify.jupianyi.files[jupianyiJS[0]] = jupianyiJS[1];
    config.cssmin.jupianyi.files[jupianyiCSS[0]] = jupianyiCSS[1];


    grunt.initConfig(config);

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib');

    /*grunt.registerTask('imgmin',[], function(){
      grunt.task.run(["clean","imagemin"]);
    });*/

    grunt.registerTask('jupianyi',["jshint"],function(a,b){
      grunt.task.run(["cssmin:jupianyi","uglify:jupianyi"]);
    
  });

     grunt.registerTask('jupianyipic', ['jshint'],function(){//图片压缩
       var done = this.async();
        smushit.smushit(jupianyiIMG, {recursive: true,onComplete: function(reports){//图片压缩
          done();
        }});
    });
};
