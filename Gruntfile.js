module.exports = function (grunt) {

  grunt.initConfig({
    builddir: 'dist',
    srcdir: 'src',
    pkg: grunt.file.readJSON('package.json'),
    buildDate: grunt.template.today('yyyy-mm-dd HH:MM:ss Z'),
    meta: {
      banner: '/**\n' +
        ' * <%= pkg.description %>\n' +
        ' *\n' +
        ' * @version v<%= pkg.version %>\n' +
        ' * @date <%= buildDate %>\n' +
        ' * @link <%= pkg.homepage %>\n' +
        ' * @license <%= pkg.license %>\n' +
        ' */'
    },
    clean: [ '<%= builddir %>' ],
    copy: {
      main: {
        expand: true,
        cwd: '<%= srcdir %>/',
        src: ['*'],
        dest: '<%= builddir %>/'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>\n'
      },
      websocket: {
        files: [
          {
            expand: true,
            cwd: '<%= srcdir %>/',
            src: ['<banner:meta.banner>', '*'],
            dest: '<%= builddir %>/',
            ext: '.min.js'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['clean', 'copy', 'uglify']);
};