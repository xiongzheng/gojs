# source: https://dojotoolkit.org/documentation/tutorials/1.8/modules/

dojoConfig =

  # get fresh resources (development)
  cacheBust:new Date(),

  has:
    "dojo-firebug": true

  basePath: "../"
  releaseDir: "./dist"

  baseUrl: ""
  

  # non-package, top-level modules not mentioned in paths are assumed to be relative to baseUrl
  tlmSiblingOfDojo: false

  # timeout for modules (5 seconds)
  waitSeconds: 5

  async: true

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
  