//>>built
define("dojox/gfx/canvasWithEvents","dojo/_base/lang,dojo/_base/declare,dojo/_base/connect,dojo/_base/Color,dojo/dom,dojo/dom-geometry,./_base,./canvas,./shape,./matrix".split(","),function(p,h,k,t,u,q,l,i,m,n){var f=l.canvasWithEvents={};f.Shape=h("dojox.gfx.canvasWithEvents.Shape",i.Shape,{_testInputs:function(a,b){if(this.clip||!this.canvasFill&&this.strokeStyle)this._hitTestPixel(a,b);else{this._renderShape(a);for(var c=this.getTransform(),e=0;e<b.length;++e){var d=b[e];if(!d.target){var g=d.x,
f=d.y,g=c?n.multiplyPoint(n.invert(c),g,f):{x:g,y:f};d.target=this._hitTestGeometry(a,g.x,g.y)}}}},_hitTestPixel:function(a,b){for(var c=0;c<b.length;++c){var e=b[c];if(!e.target){var d=e.x,g=e.y;a.clearRect(0,0,1,1);a.save();a.translate(-d,-g);this._render(a,!0);e.target=a.getImageData(0,0,1,1).data[0]?this:null;a.restore()}}},_hitTestGeometry:function(a,b,c){return a.isPointInPath(b,c)?this:null},_renderFill:function(a,b){a.pickingMode?"canvasFill"in this&&b&&a.fill():this.inherited(arguments)},
_renderStroke:function(a,b){if(this.strokeStyle&&a.pickingMode){var c=this.strokeStyle.color;try{this.strokeStyle.color=new t(a.strokeStyle),this.inherited(arguments)}finally{this.strokeStyle.color=c}}else this.inherited(arguments)},getEventSource:function(){return this.surface.getEventSource()},connect:function(a,b,c){0===a.indexOf("mouse")?a="on"+a:0===a.indexOf("ontouch")&&(a=a.slice(2));this.surface._setupEvents(a);return 2<arguments.length?k.connect(this,a,b,c):k.connect(this,a,b)},disconnect:function(a){k.disconnect(a)},
oncontextmenu:function(){},onclick:function(){},ondblclick:function(){},onmouseenter:function(){},onmouseleave:function(){},onmouseout:function(){},onmousedown:function(){},ontouchstart:function(){},touchstart:function(){},onmouseup:function(){},ontouchend:function(){},touchend:function(){},onmouseover:function(){},onmousemove:function(){},ontouchmove:function(){},touchmove:function(){},onkeydown:function(){},onkeyup:function(){}});f.Group=h("dojox.gfx.canvasWithEvents.Group",[f.Shape,i.Group],{_testInputs:function(a,
b){var c=this.children,e=this.getTransform(),d,g;if(0!==c.length){var f=[];for(d=0;d<b.length;++d)if(g=b[d],f[d]={x:g.x,y:g.y},!g.target){var h=g.x,i=g.y,h=e?n.multiplyPoint(n.invert(e),h,i):{x:h,y:i};g.x=h.x;g.y=h.y}for(d=c.length-1;0<=d;--d){c[d]._testInputs(a,b);g=!0;for(e=0;e<b.length;++e)if(null==b[e].target){g=!1;break}if(g)break}if(this.clip)for(d=0;d<b.length;++d){if(g=b[d],g.x=f[d].x,g.y=f[d].y,g.target){a.clearRect(0,0,1,1);a.save();a.translate(-g.x,-g.y);this._render(a,!0);if(!a.getImageData(0,
0,1,1).data[0])g.target=null;a.restore()}}else for(d=0;d<b.length;++d)b[d].x=f[d].x,b[d].y=f[d].y}}});f.Image=h("dojox.gfx.canvasWithEvents.Image",[f.Shape,i.Image],{_renderShape:function(a){var b=this.shape;a.pickingMode?a.fillRect(b.x,b.y,b.width,b.height):this.inherited(arguments)},_hitTestGeometry:function(a,b,c){a=this.shape;return b>=a.x&&b<=a.x+a.width&&c>=a.y&&c<=a.y+a.height?this:null}});f.Text=h("dojox.gfx.canvasWithEvents.Text",[f.Shape,i.Text],{_testInputs:function(a,b){return this._hitTestPixel(a,
b)}});f.Rect=h("dojox.gfx.canvasWithEvents.Rect",[f.Shape,i.Rect],{});f.Circle=h("dojox.gfx.canvasWithEvents.Circle",[f.Shape,i.Circle],{});f.Ellipse=h("dojox.gfx.canvasWithEvents.Ellipse",[f.Shape,i.Ellipse],{});f.Line=h("dojox.gfx.canvasWithEvents.Line",[f.Shape,i.Line],{});f.Polyline=h("dojox.gfx.canvasWithEvents.Polyline",[f.Shape,i.Polyline],{});f.Path=h("dojox.gfx.canvasWithEvents.Path",[f.Shape,i.Path],{});f.TextPath=h("dojox.gfx.canvasWithEvents.TextPath",[f.Shape,i.TextPath],{});var r={onmouseenter:"onmousemove",
onmouseleave:"onmousemove",onmouseout:"onmousemove",onmouseover:"onmousemove",touchstart:"ontouchstart",touchend:"ontouchend",touchmove:"ontouchmove"},s={ontouchstart:"touchstart",ontouchend:"touchend",ontouchmove:"touchmove"},o=navigator.userAgent.toLowerCase(),v=-1<o.search("iphone")||-1<o.search("ipad")||-1<o.search("ipod");f.Surface=h("dojox.gfx.canvasWithEvents.Surface",i.Surface,{constructor:function(){this._pick={curr:null,last:null};this._pickOfMouseUp=this._pickOfMouseDown=null},connect:function(a,
b,c){if(-1!==a.indexOf("touch"))return this._setupEvents(a),k.connect(this,"_on"+a+"Impl_",b,c);this._initMirrorCanvas();return k.connect(this.getEventSource(),a,null,m.fixCallback(this,l.fixTarget,b,c))},_ontouchstartImpl_:function(){},_ontouchendImpl_:function(){},_ontouchmoveImpl_:function(){},_initMirrorCanvas:function(){if(!this.mirrorCanvas){var a=this._parent,b=a.ownerDocument.createElement("canvas");b.width=1;b.height=1;b.style.position="absolute";b.style.left="-99999px";b.style.top="-99999px";
a.appendChild(b);this.mirrorCanvas=b}},_setupEvents:function(a){a in r&&(a=r[a]);if(!this._eventsH||!this._eventsH[a]){this._initMirrorCanvas();if(!this._eventsH)this._eventsH={};this._eventsH[a]=k.connect(this.getEventSource(),a,m.fixCallback(this,l.fixTarget,this,"_"+a));if("onclick"===a||"ondblclick"===a)this._eventsH.onmousedown||(this._eventsH.onmousedown=k.connect(this.getEventSource(),"onmousedown",m.fixCallback(this,l.fixTarget,this,"_onmousedown"))),this._eventsH.onmouseup||(this._eventsH.onmouseup=
k.connect(this.getEventSource(),"onmouseup",m.fixCallback(this,l.fixTarget,this,"_onmouseup")))}},destroy:function(){this.inherited(arguments);for(var a in this._eventsH)k.disconnect(this._eventsH[a]);this._eventsH=this.mirrorCanvas=null},getEventSource:function(){return this.rawNode},_invokeHandler:function(a,b,c){var e=a[b];e&&e.after?e.apply(a,[c]):b in s&&(e=a[s[b]])&&e.after&&e.apply(a,[c]);!e&&-1!==b.indexOf("touch")&&(b="_"+b+"Impl_",(e=a[b])&&e.apply(a,[c]));!(void 0!==c.cancelBubble&&c.cancelBubble)&&
a.parent&&this._invokeHandler(a.parent,b,c)},_oncontextmenu:function(a){this._pick.curr&&this._invokeHandler(this._pick.curr,"oncontextmenu",a)},_ondblclick:function(a){this._pickOfMouseUp&&this._invokeHandler(this._pickOfMouseUp,"ondblclick",a)},_onclick:function(a){this._pickOfMouseUp&&this._pickOfMouseUp==this._pickOfMouseDown&&this._invokeHandler(this._pickOfMouseUp,"onclick",a)},_onmousedown:function(a){(this._pickOfMouseDown=this._pick.curr)&&this._invokeHandler(this._pick.curr,"onmousedown",
a)},_ontouchstart:function(a){this._pick.curr&&this._fireTouchEvent(a)},_onmouseup:function(a){(this._pickOfMouseUp=this._pick.curr)&&this._invokeHandler(this._pick.curr,"onmouseup",a)},_ontouchend:function(a){if(this._pick.curr)for(var b=0;b<this._pick.curr.length;++b)if(this._pick.curr[b].target)a.gfxTarget=this._pick.curr[b].target,this._invokeHandler(this._pick.curr[b].target,"ontouchend",a)},_onmousemove:function(a){this._pick.last&&this._pick.last!=this._pick.curr&&(this._invokeHandler(this._pick.last,
"onmouseleave",a),this._invokeHandler(this._pick.last,"onmouseout",a));this._pick.curr&&(this._pick.last==this._pick.curr?this._invokeHandler(this._pick.curr,"onmousemove",a):(this._invokeHandler(this._pick.curr,"onmouseenter",a),this._invokeHandler(this._pick.curr,"onmouseover",a)))},_ontouchmove:function(a){this._pick.curr&&this._fireTouchEvent(a)},_fireTouchEvent:function(a){for(var b=[],c=0;c<this._pick.curr.length;++c){var e=this._pick.curr[c];if(e.target){var d=e.target.__gfxtt;if(!d)d=[],e.target.__gfxtt=
d;d.push(e.t);if(!e.target.__inToFire)b.push(e.target),e.target.__inToFire=!0}}if(0===b.length)this._invokeHandler(this,"on"+a.type,a);else for(c=0;c<b.length;++c)(function(){var e=b[c].__gfxtt,d=p.delegate(a,{gfxTarget:b[c]});if(v)d.preventDefault=function(){a.preventDefault()},d.stopPropagation=function(){a.stopPropagation()};d.__defineGetter__("targetTouches",function(){return e});delete b[c].__gfxtt;delete b[c].__inToFire;this._invokeHandler(b[c],"on"+a.type,d)}).call(this)},_onkeydown:function(){},
_onkeyup:function(){},_whatsUnderEvent:function(a){var b=q.position(this.rawNode,!0),c=[],e=a.changedTouches,d=a.touches;if(e)for(a=0;a<e.length;++a)c.push({t:e[a],x:e[a].pageX-b.x,y:e[a].pageY-b.y});else if(d)for(a=0;a<d.length;++a)c.push({t:d[a],x:d[a].pageX-b.x,y:d[a].pageY-b.y});else c.push({x:a.pageX-b.x,y:a.pageY-b.y});var a=this.mirrorCanvas,b=a.getContext("2d"),f=this.children;b.clearRect(0,0,a.width,a.height);b.save();b.strokeStyle="rgba(127,127,127,1.0)";b.fillStyle="rgba(127,127,127,1.0)";
b.pickingMode=!0;for(a=f.length-1;0<=a;a--){f[a]._testInputs(b,c);var h=!0;for(j=0;j<c.length;++j)if(null==c[j].target){h=!1;break}if(h)break}b.restore();return d||e?c:c[0].target}});f.createSurface=function(a,b,c){if(!b&&!c)var e=q.position(a),b=b||e.w,c=c||e.h;"number"==typeof b&&(b+="px");"number"==typeof c&&(c+="px");var e=new f.Surface,a=u.byId(a),d=a.ownerDocument.createElement("canvas");d.width=l.normalizedLength(b);d.height=l.normalizedLength(c);a.appendChild(d);e.rawNode=d;e._parent=a;return e.surface=
e};f.fixTarget=function(a,b){if(void 0!==a.cancelBubble&&a.cancelBubble)return!1;if(!a.gfxTarget&&(b._pick.last=b._pick.curr,b._pick.curr=b._whatsUnderEvent(a),!p.isArray(b._pick.curr)))a.gfxTarget=b._pick.curr;return!0};return f});