define(function( require, exports, module ){
    var _ = require('underscore'),
	    loop = require('./loop'),
	    colors = require('./colors'),
	    curves = require('./curves'),
	    Vec2D = require('toxi/geom/Vec2D');


	/**
	 * create a curried function that is bound to the canvas' context and sketch settings
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} settings
	 * @returns {Function} curried function for drawing a rainbow
	 */
	return function( ctx, settings ){
		/**
		 * draw a rainbow asynchronously with requestAnimationFrame and invoke callback on completion
		 * @param {toxi/geom/Vec2D} origin the cartesian coordinates for the next operation
		 * @param {Function} cb the callback for when completed
		 * @returns {app/loop} the animation loop for stopping later
		 */
		return function( origin, cb ){
			var previousOperation = curves.previous();
			var operation = curves.next();
			if( settings.verbose ){
				console.log('operation ('+curves.operations.indexOf( operation )+'): ', operation.angles, ' counter: '+ operation.counterClockwise +' next: '+ operation.next);
			}
			var angleStep = (operation.angles[1] - operation.angles[0]) / settings.resolution,
				lastAngle = operation.angles[0],
				b = new Vec2D(settings.radius, operation.angles[1]).toCartesian();

			if( previousOperation && operation.counterClockwise !== previousOperation.counterClockwise ){
				origin.addSelf(
					new Vec2D( settings.radius*2, previousOperation.angles[1])
						.toCartesian()
				);
			}

			return loop(function(frameCount, cancel){
				ctx.lineWidth = settings.lineWidth;
				ctx.lineCap = 'square';
				var nextAngle = lastAngle + angleStep;
				var arc = function(rad, clr){
					ctx.strokeStyle = clr;
					ctx.beginPath();
					ctx.arc(origin.x, origin.y, rad, lastAngle, nextAngle, operation.counterClockwise);
					ctx.stroke();
					ctx.closePath();
				};
				//draw each color of the rainbow
				var clrs = colors.values.slice(0);
				if( operation.counterClockwise ){
					clrs.reverse();
				}
				arc(settings.radius + (settings.lineWidth*2) + (settings.spacing*2), clrs[0] );
				arc(settings.radius + settings.lineWidth + settings.spacing, clrs[1]);
				arc(settings.radius, clrs[2]);
				arc(settings.radius - (settings.lineWidth + settings.spacing), clrs[3]);
				arc(settings.radius - ((settings.lineWidth*2) + (settings.spacing*2)), clrs[4] );
				lastAngle = nextAngle;
				if(frameCount === settings.resolution){
					cancel();
					if(cb) cb();
				}
			}).start();
		}
	};


});