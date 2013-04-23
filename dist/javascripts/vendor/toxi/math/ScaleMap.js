define(["require","exports","module","./mathUtils","./LinearInterpolation"],function(t,e,i){var n=t("./mathUtils"),r=t("./LinearInterpolation"),s=function(t,e){this.min=t,this.max=e};s.prototype.toString=function(){return"{ min: "+this.min+", max: "+this.max+"}"};var o=function(t,e,i,n){if(1==arguments.length&&void 0!==arguments[0].input&&void 0!==arguments[0].output){var s=arguments[0];i=s.output.min,n=s.output.max,e=s.input.max,t=s.input.min}this.mapFunction=new r,this.setInputRange(t,e),this.setOutputRange(i,n)};o.prototype={getClippedValueFor:function(t){var e=n.clipNormalized((t-this._in.min)/this._interval);return this.mapFunction.interpolate(0,this.mapRange,e)+this._out.min},getInputMedian:function(){return.5*(this._in.min+this._in.max)},getInputRange:function(){return this._in},getMappedMedian:function(){return this.getMappedValueFor(.5)},getMappedValueFor:function(t){var e=(t-this._in.min)/this._interval;return this.mapFunction.interpolate(0,this.mapRange,e)+this._out.min},getOutputMedian:function(){return.5*(this._out.min+this._out.max)},getOutputRange:function(){return this._out},setInputRange:function(t,e){this._in=new s(t,e),this._interval=e-t},setMapFunction:function(t){this.mapFunction=t},setOutputRange:function(t,e){this._out=new s(t,e),this.mapRange=e-t},toString:function(){return"ScaleMap, inputRange: "+(""+this._in)+" outputRange: "+(""+this._out)}},i.exports=o});