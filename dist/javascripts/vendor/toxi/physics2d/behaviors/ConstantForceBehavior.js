define(["require","exports","module","../../geom/Vec2D"],function(t,e,i){var n=t("../../geom/Vec2D"),s=function(t){this.force=t,this.scaleForce=new n,this.timeStep=0};s.prototype={applyBehavior:function(t){t.addForce(this.scaledForce)},configure:function(t){this.timeStep=t,this.setForce(this.force)},getForce:function(){return this.force},setForce:function(t){this.force=t,this.scaledForce=this.force.scale(this.timeStep)},toString:function(){return"behavior force: "+this.force+" scaledForce: "+this.scaledForce+" timeStep: "+this.timeStep}},i.exports=s});