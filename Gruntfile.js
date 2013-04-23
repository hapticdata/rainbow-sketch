

module.exports = function(grunt){


	grunt.initConfig({
		// compile .scss/.sass to .css using Compass
		// http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
		compass: {
			dist: {
				options: {
					basePath: 'www',
					cssDir: 'stylesheets',
					sassDir: '../sass',
					imagesDir: 'images'
				}
			}
		},
		//compile requirejs files for production
		requirejs: {
			compile: {
				options: {
					appDir: 'www/',
					baseUrl: 'javascripts/vendor',
					paths: {
						'main': '../main',
						'config': '../config',
						'app': '../app',
						'requestAnimationFrame': '../requestAnimationFrame'
					},
					dir: 'dist/',
					optimizeCss: 'standard',
					preserveLicenseComments: false,
					optimize: 'uglify2',
					modules: [
						{
							name: 'main',
							include: ['domReady'],
							exclude: ['app/main']
						},
						{
							name: 'app/main',
							exclude: [
								'underscore'
							]
						}
					]
				}
			}
		},
		//better-than-watch
		regarde: {
			compass: {
				files: [
					'sass/*.{scss,sass}',
				],
				tasks: 'compass'
			}
		}
	});
	grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.registerTask('default', ['compass', 'regarde']);
	grunt.registerTask('dist', ['compass:dist', 'requirejs']);

};
