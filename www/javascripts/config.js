/*global requirejs*/
requirejs.config({
	baseUrl: 'javascripts/vendor',
	shim: {
		'underscore': { exports: '_' }
	},
	paths: {
		'app': '../app',
		'requestAnimationFrame': '../requestAnimationFrame'
	}
});