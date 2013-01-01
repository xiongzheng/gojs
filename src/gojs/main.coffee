###
requirejs.config
  #baseUrl: ''
  #urlArgs: 'bust=' + (new Date()).getTime()
  paths:
    'dojox': 'lib/dojox'
    'dojo': 'lib/dojox'

###


require ["dojox/gfx"], (gfx) ->
  surface = gfx.createSurface("surfaceElement", 400, 400)
  rectangle = surface.createRect({ x: 100, y: 50, width: 200, height: 100 }).setFill('blue')
  console.log "goboardz"
  return
