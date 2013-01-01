# build profile for the project

profile = 
  releaseDir: "../dist"
  releaseName: "gojs-0.2"
  basePath: "../"

  mini: true,
  stripConsole: "warn",
  optimize: 'closure',
  layerOptimize: 'closure',
  selectorEngine: 'acme',


  staticHasFeatures:
    "config-deferredInstrumentation": 0
    "config-dojo-loader-catches": 0
    "config-tlmSiblingOfDojo": 0
    "dojo-amd-factory-scan": 0
    "dojo-combo-api": 0
    "dojo-config-api": 1
    "dojo-config-require": 0
    "dojo-debug-messages": 0
    "dojo-dom-ready-api": 1
    "dojo-firebug": 0
    "dojo-guarantee-console": 1
    "dojo-has-api": 1
    "dojo-inject-api": 1
    "dojo-loader": 1
    "dojo-log-api": 0
    "dojo-modulePaths": 0
    "dojo-moduleUrl": 0
    "dojo-publish-privates": 0
    "dojo-requirejs-api": 0
    "dojo-sniff": 0
    "dojo-sync-loader": 0
    "dojo-test-sniff": 0
    "dojo-timeout-api": 0
    "dojo-trace-api": 0
    "dojo-undef-api": 0
    "dojo-v1x-i18n-Api": 1
    dom: 1
    "host-browser": 1
    "extend-dojo": 1

        ###
        # svg imports
        "dojo/_base/lang", "dojo/_base/sniff", "dojo/_base/window", "dojo/dom", "dojo/_base/declare", "dojo/_base/array",
        "dojo/dom-geometry", "dojo/dom-attr", "dojo/_base/Color", "./_base", "./shape", "./path",

        # vml imports
        "dojo/_base/lang", "dojo/_base/declare", "dojo/_base/array", "dojo/_base/Color", "dojo/_base/sniff",
        "dojo/_base/config", "dojo/dom", "dojo/dom-geometry", "dojo/_base/kernel",
        "./_base", "./shape", "./path", "./arc", "./gradient", "./matrix",
        ###
  layers:
    "moo":
      include: ["dojo/dojo", 
        
        # global hook up
        "dojo/_base/kernel", 

        # dojo prereqs
        # review if needed
        "dojo/dom", 
        "dojo/fx", "dojo/domReady", 

        # main app
        "gojs/main", 
        
        # dojox.gfx (advanced dependencies settings)
        # review commits: https://github.com/dojo/dojox/tree/master/gfx
        "dojox/gfx/_gfxBidiSupport",
        "dojox/gfx/decompose",
        "dojox/gfx/fx",
        "dojox/gfx/gradutils",
        "dojox/gfx/matrix",

        # not needed
        #"dojox/gfx/move",
        #"dojox/gfx/Moveable",
        #"dojox/gfx/Mover",

        "dojox/gfx/svg",
        "dojox/gfx/svg_attach",
        #"dojox/gfx/svgext", 

        "dojox/gfx/vml_attach", 

        
        "dojox/gfx/vml", 
        "dojo/colors",
        "dojox/gfx",
        "dojox/gfx/utils",
        "dojox/gfx/renderer",
        "dojox/gfx/silverlight_attach",
        "dojox/gfx/canvas_attach",
        "dojox/gfx/canvasWithEvents",
        "dojox/gfx/VectorText"] 
      #dependencies: [, ]
      boot: true
      customBase: true

  
  packages: [
    name: "dojo"
    location: "lib/dojo"
  ,
    name: "dijit"
    location: "lib/dijit"
  ,
    name: "dojox"
    location: "lib/dojox"
  ,
    name: "gojs"
    location: "gojs"
  ]