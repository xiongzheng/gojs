//>>built
define("dojox/io/xhrWindowNamePlugin","dojo/_base/kernel,dojo/_base/json,dojo/_base/xhr,dojox/io/xhrPlugins,dojox/io/windowName,dojox/io/httpParse,dojox/secure/capability".split(","),function(c,l,m,e,i,n,j){c.getObject("io.xhrWindowNamePlugin",!0,dojox);dojox.io.xhrWindowNamePlugin=function(b,f,k){e.register("windowName",function(c,a){return!0!==a.sync&&("GET"==c||"POST"==c||f)&&a.url.substring(0,b.length)==b},function(b,a,e){var g=i.send,h=a.load;a.load=void 0;var d=(f?f(g,!0):g)(b,a,e);d.addCallback(function(a){var b=
d.ioArgs;b.xhr={getResponseHeader:function(a){return c.queryToObject(b.hash.match(/[^#]*$/)[0])[a]}};return"json"==b.handleAs?(k||j.validate(a,["Date"],{}),c.fromJson(a)):c._contentHandlers[b.handleAs||"text"]({responseText:a})});(a.load=h)&&d.addCallback(h);return d})};return dojox.io.xhrWindowNamePlugin});