//>>built
define("dojox/mobile/Switch","dojo/_base/array,dojo/_base/connect,dojo/_base/declare,dojo/_base/event,dojo/_base/window,dojo/dom-class,dojo/dom-construct,dojo/dom-style,dojo/touch,dijit/_Contained,dijit/_WidgetBase,./sniff".split(","),function(j,k,l,m,i,f,n,o,g,p,q,h){return l("dojox.mobile.Switch",[q,p],{value:"on",name:"",leftLabel:"ON",rightLabel:"OFF",shape:"mblSwDefaultShape",tabIndex:"0",_setTabIndexAttr:"",baseClass:"mblSwitch",role:"",_createdMasks:[],buildRendering:function(){this.domNode=
this.srcNodeRef&&"SPAN"===this.srcNodeRef.tagName?this.srcNodeRef:n.create("span");this.inherited(arguments);var a=this.srcNodeRef&&this.srcNodeRef.className||this.className||this["class"];if(a=a.match(/mblSw.*Shape\d*/))this.shape=a;f.add(this.domNode,this.shape);this.domNode.innerHTML='<div class="mblSwitchInner"><div class="mblSwitchBg mblSwitchBgLeft"><div class="mblSwitchText mblSwitchTextLeft"></div></div><div class="mblSwitchBg mblSwitchBgRight"><div class="mblSwitchText mblSwitchTextRight"></div></div><div class="mblSwitchKnob"></div><input type="hidden"'+
(this.name?' name="'+this.name+'"':"")+"></div></div>";a=this.inner=this.domNode.firstChild;this.left=a.childNodes[0];this.right=a.childNodes[1];this.knob=a.childNodes[2];this.input=a.childNodes[3]},postCreate:function(){this._clickHandle=this.connect(this.domNode,"onclick","_onClick");this._keydownHandle=this.connect(this.domNode,"onkeydown","_onClick");this._startHandle=this.connect(this.domNode,g.press,"onTouchStart");this._initialValue=this.value},_changeState:function(a,c){var e="on"===a;this.left.style.display=
"";this.right.style.display="";this.inner.style.left="";c&&f.add(this.domNode,"mblSwitchAnimation");f.remove(this.domNode,e?"mblSwitchOff":"mblSwitchOn");f.add(this.domNode,e?"mblSwitchOn":"mblSwitchOff");var d=this;setTimeout(function(){d.left.style.display=e?"":"none";d.right.style.display=!e?"":"none";f.remove(d.domNode,"mblSwitchAnimation")},c?300:0)},_createMaskImage:function(){if(!this._hasMaskImage&&(this._width=this.domNode.offsetWidth-this.knob.offsetWidth,this._hasMaskImage=!0,h("webkit"))){var a=
o.get(this.left,"borderTopLeftRadius");if("0px"!=a){var c=a.split(" "),a=parseFloat(c[0]),c=1==c.length?a:parseFloat(c[1]),e=this.domNode.offsetWidth,d=this.domNode.offsetHeight,f=(this.shape+"Mask"+e+d+a+c).replace(/\./,"_");if(!this._createdMasks[f]){this._createdMasks[f]=1;var b=i.doc.getCSSCanvasContext("2d",f,e,d);b.fillStyle="#000000";b.beginPath();a==c?(b.moveTo(a,0),b.arcTo(0,0,0,a,a),b.lineTo(0,d-a),b.arcTo(0,d,a,d,a),b.lineTo(e-a,d),b.arcTo(e,d,e,a,a),b.lineTo(e,a),b.arcTo(e,0,e-a,0,a)):
(d=Math.PI,b.scale(1,c/a),b.moveTo(a,0),b.arc(a,a,a,1.5*d,0.5*d,!0),b.lineTo(e-a,2*a),b.arc(e-a,a,a,0.5*d,1.5*d,!0));b.closePath();b.fill()}this.domNode.style.webkitMaskImage="-webkit-canvas("+f+")"}}},_onClick:function(a){if(!(a&&"keydown"===a.type&&13!==a.keyCode||!1===this.onClick(a))&&!this._moved)this.value=this.input.value="on"==this.value?"off":"on",this._changeState(this.value,!0),this.onStateChanged(this.value)},onClick:function(){},onTouchStart:function(a){this._moved=!1;this.innerStartX=
this.inner.offsetLeft;if(!this._conn)this._conn=[this.connect(this.inner,g.move,"onTouchMove"),this.connect(this.inner,g.release,"onTouchEnd")];this.touchStartX=a.touches?a.touches[0].pageX:a.clientX;this.left.style.display="";this.right.style.display="";m.stop(a);this._createMaskImage()},onTouchMove:function(a){a.preventDefault();if(a.targetTouches){if(1!=a.targetTouches.length)return;a=a.targetTouches[0].clientX-this.touchStartX}else a=a.clientX-this.touchStartX;var c=this.innerStartX+a;c<=-(this._width-
10)&&(c=-this._width);-10<=c&&(c=0);this.inner.style.left=c+"px";if(10<Math.abs(a))this._moved=!0},onTouchEnd:function(){j.forEach(this._conn,k.disconnect);this._conn=null;if(this.innerStartX==this.inner.offsetLeft){if(h("touch")&&!(4.1<=h("android"))){var a=i.doc.createEvent("MouseEvents");a.initEvent("click",!0,!0);this.inner.dispatchEvent(a)}}else if(a=this.inner.offsetLeft<-(this._width/2)?"off":"on",this._changeState(a,!0),a!=this.value)this.value=this.input.value=a,this.onStateChanged(a)},onStateChanged:function(){},
_setValueAttr:function(a){this._changeState(a,!1);if(this.value!=a)this.onStateChanged(a);this.value=this.input.value=a},_setLeftLabelAttr:function(a){this.leftLabel=a;this.left.firstChild.innerHTML=this._cv?this._cv(a):a},_setRightLabelAttr:function(a){this.rightLabel=a;this.right.firstChild.innerHTML=this._cv?this._cv(a):a},reset:function(){this.set("value",this._initialValue)}})});