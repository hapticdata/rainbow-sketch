define(["dat/controllers/Controller","dat/dom/dom","dat/utils/common"],function(t,e,i){var n=function(t,i){function r(){s.setValue(!s.__prev)}n.superclass.call(this,t,i);var s=this;this.__prev=this.getValue(),this.__checkbox=document.createElement("input"),this.__checkbox.setAttribute("type","checkbox"),e.bind(this.__checkbox,"change",r,!1),this.domElement.appendChild(this.__checkbox),this.updateDisplay()};return n.superclass=t,i.extend(n.prototype,t.prototype,{setValue:function(t){var e=n.superclass.prototype.setValue.call(this,t);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),e},updateDisplay:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0):this.__checkbox.checked=!1,n.superclass.prototype.updateDisplay.call(this)}}),n});