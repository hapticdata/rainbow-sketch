define(function(require, exports){
	var _ = require('underscore');
	var lastOperation;

	/**
	 * a map of the ways to draw the arc and indices of next suitable operations
	 * @expose
	 */
	var operations = [
		{ angles: [1, 1.5], next: [1,3] },
		{ angles: [1.5, 2], next: [2, 7] },
		{ angles: [1, 0.5], next: [3, 1] },
		{ angles: [0.5, 0], next: [0, 5] },
		{ angles: [1.5, 1], next: [2, 7] },
		{ angles: [2, 1.5], next: [4, 6] },
		{ angles: [0.5, 1], next: [0, 5] },
		{ angles: [0, 0.5], next: [4,6] }
	];

	//multiply every item in the arc array by PI
	_(operations).each(function( op ){
		_(op.angles).each(function( rad, i ){
			op.angles[i] *= Math.PI;
			//add a property for whether it is counterClockwise or not
			op.counterClockwise = op.angles[0] > op.angles[1];
		});
	});


	/**
	 * get the next curve to perform
	 * @returns {Object} the curve from `operations`
	 */
	exports.next = function(){
		var i = -1;
		if( !lastOperation ){
			i = Math.floor(Math.random()*operations.length);
		} else {
			i = lastOperation.next[Math.floor(Math.random()*lastOperation.next.length)];
		}
		if(i<0){
			throw Error("No operation found: ", i);
		}
		return exports.get( i );
	};

	/**
	 * get the curve to perform by index
	 * @param {Number} i index of operation
	 * @returns {Object}
	 */
	exports.get = function( i ){
		lastOperation = operations[i];
		return lastOperation;
	};
	/**
	 * the last curve operation performed
	 * @returns {Object}
	 */
	exports.previous = function(){
		return lastOperation;
	};
	/**
	 * the exposed operations
	 * @type {Array}
	 */
	exports.operations = operations;
});