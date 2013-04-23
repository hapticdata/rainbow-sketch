define(function( require, exports, module ){
	var datGui = require('dat/gui/GUI');

	/**
	 * build the gui for changing parameters
	 * @param {Object} settings object for manipulation
	 * @param {Number} settings.radius
	 * @param {Number} settings.lineWidth
	 * @param {Number} settings.resolution
	 * @param {Number} settings.spacing
	 * @param {Function} settings.restart
	 * @returns {dat/gui/GUI} the gui instance
	 */
	return function( settings ){
		var gui = new datGui();

		var lineWidthSlider;
		var updateMaxLineWidth = function(){
			var maxLineWidth = Math.floor((settings.radius / 4) - (settings.spacing * 2));
			settings.lineWidth = Math.min(settings.lineWidth, maxLineWidth);
			lineWidthSlider.__max = maxLineWidth;
			lineWidthSlider.updateDisplay();
		};

		gui.add(settings, 'radius', 24, 150).onChange(updateMaxLineWidth);
		lineWidthSlider = gui.add(settings, 'lineWidth', 1, 25).listen().step(1);
		gui.add(settings, 'resolution', 2, 50).step(1);
		gui.add(settings, 'spacing', 0, 12).onChange(updateMaxLineWidth).step(1);
		gui.add(settings, 'restart');
		return gui;
	};
});