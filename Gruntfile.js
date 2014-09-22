module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.initConfig({
        jasmine: {
            mockCookie: {
                src: 'src/**/*.js',
                options: {
                    specs: 'test/**.spec.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            baseUrl: 'src/'
                        }
                    }
                }
            }
        }
    });

    grunt.registerTask('test', ['jasmine:mockCookie']);

};
