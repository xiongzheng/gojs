// Generated by CoffeeScript 1.4.0
/*
requirejs.config
  #baseUrl: ''
  #urlArgs: 'bust=' + (new Date()).getTime()
  paths:
    'dojox': 'lib/dojox'
    'dojo': 'lib/dojox'
*/

require(["dojox/gfx"], function(gfx) {
  var rectangle, surface;
  surface = gfx.createSurface("surfaceElement", 400, 400);
  rectangle = surface.createRect({
    x: 100,
    y: 50,
    width: 200,
    height: 100
  }).setFill('blue');
  0 && console.log("goboardz");
});
