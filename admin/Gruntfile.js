
var csspaths = ["dev/sass/**"];
var jspaths = [
  'dev/js/main.js',
  'dev/js/models/*.js',
  'dev/js/collections/*.js',
  'dev/js/views/*.js',
  'dev/js/routers/*.js',
  'dev/js/services/*.js',
  'dev/js/utils/*.js'
];
var compiledtemplatepath = ["../WeAppToMove/www/admin/public/js/templates.js"];
var concatpaths = compiledtemplatepath.concat(jspaths)
var templatepaths = ["dev/templates/*.html"];

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts:{
        files: jspaths,
        tasks: ['concat']
      },
      css:{
        files: csspaths,
        tasks:['compass:development']
      },
      templates: {
        files: templatepaths,
        tasks: ['copy']
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: templatepaths, dest: '../WeAppToMove/www/admin/public/templates'},

        ]
      }
    },


    concat: {
      options: {
        banner: "(function(){\n\n",
        footer: "\n\n})();",
        separator: '\n\n'
      },
      dist: {
        src: concatpaths,
        dest: '../WeAppToMove/www/admin/public/js/main.js'
      }
    },

    compass: {
      development: {
        options: {
          sassDir: 'dev/sass',
          cssDir: '../WeAppToMove/www/admin/public/css',
          environment: 'development'
        }
      },
      production: {
        options: {
          sassDir: 'dev/sass',
          cssDir: 'public/css',
          environment: 'production',
          outputStyle: 'compressed',
          force: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');


  grunt.registerTask('default', ['concat','compass:development', 'copy']);
  grunt.registerTask('production', ['concat','compass:production']);

};
