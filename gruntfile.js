
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.title || pkg.name %>.js'],
        dest: 'dist/<%= pkg.title || pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
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
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    jasmine_node: {
      extensions : "js",
      specNameMatcher: "spec", // load only specs containing specNameMatcher
      projectRoot: ".",
      requirejs: false,
      forceExit: true,
      jUnit: {
        report: false,
        savePath : "./build/reports/jasmine/",
        useDotNotation: true,
        consolidate: true
      },
      all: ['/spec']
    },
    jasmine: {
      pivotal: {
        src: 'public/javascripts/*.js',
        options: {
          specs: 'ui/spec/*Spec.js',
          helpers: 'ui/spec/*Helper.js'
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      },
      pivotal : {
        files: ['src/**/*.js', 'specs/**/*.js'],
        tasks: 'jasmine:pivotal:build'
      }
    },
     handlebars: {
       compile: {
         options: {
          processName: function(filename) {
            return filename.replace(".html","").replace("public/javascripts/templates/","");
          },
           namespace: "App.Templates"
         },
         files: {
           "public/javascripts/templates.js": ["public/javascripts/templates/**/*.html"]
         }
       }
     },
     concurrent: {
       target: {
         tasks: ['nodemon', 'watch'],
         options: {
           logConcurrentOutput: true
         }
       }
     },
     nodemon: {
      dev: {
        options: {
          file: 'app.js',
          nodeArgs: ['--debug']
        }
      }
     }
  });


  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  // Default task.
  grunt.registerTask('default', ['jasmine_node','nodemon', 'jshint', 'handlebars', 'jasmine', 'concat', 'uglify']);

};
