module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    nodewebkit: {
    options: {
        build_dir: './webkitbuilds', 
        mac: false, // Change to true if want to build it for mac
        win: true, // Change to true if  want to build it for win
        linux32: false, // 
        linux64: true // 
    },
    src: ['./**/*'] // Your node-webkit app
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  // Default task(s).
  grunt.registerTask('default', ['nodewebkit']);

};
