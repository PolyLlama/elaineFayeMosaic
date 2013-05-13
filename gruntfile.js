module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
		sass: {
    		dist: {
      			files: {
        			'public/stylesheets/test.css': 'public/sass/test.scss'
      			}
    		}
  		}
	});

  // Load the plugin that provides the sass task.
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['sass']);

};