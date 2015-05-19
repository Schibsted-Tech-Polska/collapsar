var webpackConfig = require('./webpack.config.js');
module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-webpack");
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      options: {
        // Override defaults here 
      },
      dev: {
        options: {
          script: 'test-server/app.js'
        }
      }
    },
    webpack: {
      dev: webpackConfig
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'dist', src: ['bundle.js','bundle.js.map'], dest: 'test-server/public/javascripts'}
        ]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      webpack: {
        files: ['src/**/*.*'],
        tasks: ['webpack:dev', 'copy']
      },
      express: {
        files: ['Gruntfile.js',
                'node-middleware/**/*.js',
                'test-server/views/**/*.hjs',
                'test-server/app.js'
        ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded 
        }
      }
    }
  });


  grunt.registerTask('default', ['webpack:dev', 'copy', 'express:dev','watch']);
};
