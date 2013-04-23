define(["require","exports","module","./WaveState"],function(t,e,i){var n=t("./WaveState"),s=function(t,e,i,n){(void 0!==t||void 0!==e||void 0!==i||void 0!==n)&&(this.setPhase(t),this.frequency=e,void 0===i&&(i=1),void 0===n&&(n=1),this.amp=i,this.offset=n)};s.prototype={cyclePhase:function(t){return void 0===t&&(t=0),this.phase=(this.phase+t)%s.TWO_PI,0>this.phase&&(this.phase+=s.TWO_PI),this.phase},getClass:function(){return"AbstractWave"},pop:function(){if(void 0===this.stateStack||void 0!==this.stateStack&&0>=this.stateStack.length)console.log(""+this),console.log("no wave states on stack");else{var t=this.stateStack.pop();this.phase=t.phase,this.frequency=t.frequency,this.amp=t.amp,this.offset=t.offset}},push:function(){void 0===this.stateStack&&(this.stateStack=[]),this.stateStack.push(new n(this.phase,this.frequency,this.amp,this.offset))},reset:function(){this.phase=this.origPhase},setPhase:function(t){this.phase=t,this.cyclePhase(),this.origPhase=t},toString:function(){return this.getClass()+" phase:"+this.phase+" frequency: "+this.frequency+" amp: "+this.amp+" offset: "+this.offset},update:function(){console.log(this.getClass()+" this should be overridden")}},s.PI=3.141592653589793,s.TWO_PI=2*s.PI,s.hertzToRadians=function(t,e){return t/e*s.TWO_PI},s.radiansToHertz=function(t,e){return t/s.TWO_PI*e},i.exports=s});