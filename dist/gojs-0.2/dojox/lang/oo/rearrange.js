//>>built
define("dojox/lang/oo/rearrange",["dojo","dijit","dojox"],function(h,m,l){h.provide("dojox.lang.oo.rearrange");(function(){var i=h._extraNames,j=i.length,k=Object.prototype.toString,e={};l.lang.oo.rearrange=function(c,g){var a,b,d,f;for(a in g)if(b=g[a],!b||"[object String]"==k.call(b))if(d=c[a],!(a in e)||e[a]!==d)delete c[a]||(c[a]=void 0),b&&(c[b]=d);if(j)for(f=0;f<j;++f)if(a=i[f],b=g[a],!b||"[object String]"==k.call(b))if(d=c[a],!(a in e)||e[a]!==d)delete c[a]||(c[a]=void 0),b&&(c[b]=d);return c}})()});