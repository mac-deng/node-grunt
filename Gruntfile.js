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

var jupianyiJS = ['E:/app/tencentapp1/js/global.js',
           'E:/app/tencentapp1/js/pager.js', 
           'E:/app/tencentapp1/js/cheap.js', 
           'E:/app/tencentapp1/js/dajiatao.js', 
           'E:/app/tencentapp1/js/appimgload.js', 
           'E:/app/tencentapp1/js/stat.js', 
           'E:/app/tencentapp1/js/group.js', 
           'E:/app/tencentapp1/js/lottery.js'
           ];
var jupianyiCSS = ['E:/app/tencentapp1/css/index.css',
           'E:/app/tencentapp1/css/cheap.css',
           'E:/app/tencentapp1/css/pager.css',
           'E:/app/tencentapp1/css/dajiatao.css',
           'E:/app/tencentapp1/css/lottery.css'
           ];           

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
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
      compress: {
        files: {
          "dist/output.css": ["test/input.css", "test/input1.css"]
        }
      },
      jupianyi: {
        files: {
          "E:/app/tencentapp1/css/site.css": jupianyiCSS
        }
      }
    },
    imagemin: {                          // Task
      dist: {                            // Target
        options: {                       // Target options
          optimizationLevel: 3
        },
        files: {                         // Dictionary of files
          'dist/img/': 'test/img/*.png'
        }
      }
    },
    clean: ["dist/img/"],
    uglify: {
      jupianyi: {
        files: {
          'E:/app/tencentapp1/js/site.js': jupianyiJS
        }
      }
    },
    watch: {
      scripts: {
        files: ["E:/app/tencentapp1/css-souce/*.css","E:/app/tencentapp1/js-souce/*.js"],
        tasks: ['jupianyi'],
        options: {
          interrupt: true
        }
      }
    }
  });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib');


    grunt.registerTask('imgmin',[], function(){
      grunt.task.run(["clean","imagemin"]);
    });

    grunt.registerTask('jupianyi',["jshint"],function(a,b){
      grunt.task.run(["cssmin:jupianyi","uglify:jupianyi"]);
    
  });

     grunt.registerTask('jupianyipic', ['jshint'],function(){//图片压缩

       var done = this.async();
        smushit.smushit('E:/app/tencentapp1/img/', {recursive: true,onComplete: function(reports){//图片压缩
          done();
        }});
    });
};
