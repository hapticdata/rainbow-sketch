/*global define, window*/
define(function(require){
	var _ = require('underscore'),
		Vec2D = require('toxi/geom/Vec2D'),
		Circle = require('toxi/geom/Circle'),
		Rect = require('toxi/geom/Rect');


	/**
	 * the entry to the sketch, binds to dom, creates canvas and initializes sketch
	 */
	return function(){

		var container = document.querySelector('.container'),
			canvas = document.getElementById('sketch'),
			ctx = canvas.getContext('2d'),
			origin = new Vec2D(),
			bounds,
			settings,
			resize,
			loop,
			gui;

		//the settings for the gui
		settings = {
			radius: 35,
			resolution: 10,
			lineWidth: 8,
			spacing: 0,
			verbose: false
		};

		//handle resizing the canvas
		resize = function(){
			//make the container fullscreen
			container.style.height = window.innerHeight + 'px';
			if(canvas.width && canvas.height){
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
			bounds = new Rect(
				0, 0,
				Math.floor(window.innerWidth / settings.radius) * settings.radius * 2,
				Math.floor(window.innerHeight / settings.radius) * settings.radius * 2
			);
			var dims = bounds.getDimensions();
			canvas.width = dims.x; //retina
			canvas.height = dims.y;
			canvas.style.width = (dims.x / 2) + 'px';
			canvas.style.height = (dims.y / 2) + 'px';
		};

		//restart the canvas with new settings
		settings.restart = function(){
			var rainbow, drawRainbow;
			//if there is a previous loop going, stop it
			if(loop){
				loop.stop();
			}
			resize();
			(function setStartPosition(){
				var dims = bounds.getDimensions().scale(0.5);
				dims.x -= (dims.x % settings.radius);
				dims.y -= (dims.y % settings.radius);
				origin.set(dims);
			})();
			//the process of drawing the curves
			rainbow = require('./rainbow')(ctx, _.clone(settings));
			//the loop of drawing multiple curves
			drawRainbow = function(){
				if(origin.x < 0){ origin.x = canvas.width; }
				if(origin.x > canvas.width){ origin.x = 0; }
				if(origin.y < 0){ origin.y = canvas.height; }
				if(origin.y > canvas.height){ origin.y = 0; }
				//async recurse
				loop = rainbow(origin, drawRainbow);
			};
			drawRainbow();
		};
		//initialize the gui
		gui = require('./gui')( settings );
		window.addEventListener('resize',resize, false);
		//kick it off with defaults
		settings.restart();
	};
});