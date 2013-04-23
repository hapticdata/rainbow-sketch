define(function(require, exports){

	var _ = require('underscore'),
		i = 0;
	/**
	 * array of the color values
	 * @type {*}
	 */
	exports.values = [
		'hsla(4.91, 70.37%, 47.65%, 1.0)',
		'hsla(45.55, 92.27%, 59.41%, 1.0)',
		'hsla(115.06, 96.34%, 32.16%, 1.0)',
		'hsla(201.73, 91.59%, 58.04%, 1.0)',
		'hsla(277.66, 58.70%, 51.57%, 1.00)'
	];
	/**
	 * the labeled colors
	 * @type {{red: string, yellow: string, green: string, blue: string}}
	 */
	exports.list = _.object(['red','yellow','green','blue', 'purple'], exports.values);
	/**
	 * get the color after the last one requested
	 * @returns {string}
	 */
	exports.getNext = function(){
		return exports.values[i++ % exports.values.length];
	};

});