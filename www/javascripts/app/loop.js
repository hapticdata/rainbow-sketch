define(function(require){
	var requestAnimationFrame = require('requestAnimationFrame');

	/**
	 * create a simple animation loop with the provided function,
	 * @param {Function} fn the function to call repeatedly, with signature ( frameCount:Number, cancel:Function )
	 * @returns {Function} to invoke to start the loop
	 */
	return function(fn){
		var frameCount = 1, canceled = false;
		var exports;
		//allow the loop to be canceled
		var cancel = function(){
			canceled = true;
		};
		//the loop
		var _fn = function(){
			if(!canceled){
				fn(frameCount++, cancel);
				requestAnimationFrame(_fn);
			}
		};

		exports = {
			start: function(){
				_fn();
				return exports;
			},
			stop: cancel
		};

		return exports;
	};
});
