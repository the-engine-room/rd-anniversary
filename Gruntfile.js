module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

    /***
		concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: grunt.util.linefeed + '/* --- concatenate --- *//*' + grunt.util.linefeed,
        stripBanners: true,
        sourceMap: true
      },
      dist: {
        // the files to concatenate
        src: ['public/src/js/script.js', 'public/src/js/<%= pkg.name %>.js'],
        // the location of the resulting JS file
        dest: 'public/src/js/<%= pkg.name %>.concat.js'
      },
	  },
    */
		less: {
      always: {
        options: {
          paths: ['src/less'],
          plugins: [
            new (require('less-plugin-clean-css'))({advanced: true})
          ],
        },
        files: {
          'css/rda_main.css': 'src/less/main.less'
        }
      }
    },


    copy: {
			build: {
				files: [
					{
						src: 'src/components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
						dest: 'js/jquery.mCustomScrollbar.concat.min.js'
					},
          {
						src: 'src/components/jquery/dist/jquery.min.js',
						dest: 'js/jquery.min.js'
					},
					{
						src: 'src/components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css',
						dest: 'css/jquery.mCustomScrollbar.min.css'
					},
				]
			}
		},

    uglify: {
      js: {
        options: {
          preserveComments: false
        },
        files: {
          'js/rda.min.js': ['src/js/rda.js'],
			  }
      }
    },

		watch: {
      less: {
        files: ['src/less/*', 'src/less/utils/*', 'src/less/partials/*'],
        tasks: 'less:always',
        options: {
          livereload: true
        }
      },
      uglify: {
        files: ['src/js/rda.js', 'src/js/main.js'],
        tasks: 'uglify:js'
      }
    }
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Register tasks
	grunt.registerTask('default', ['watch']);
	grunt.registerTask(
    'build', [
		    'copy:build',
				'less:always',
				// 'concat:dist',
				'uglify:js'
		]
  );
};
