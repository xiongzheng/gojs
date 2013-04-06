((global) ->



  class _GoBoard

    constructor: (@container, @container_size, @board_size) ->      

      get_this = this
      require ["gojs/main"], (_GoBoard) ->
        get_this.go_board = new _GoBoard(container, container_size, board_size)
        return

  if global.GoBoard
    throw new Error("GoBoard has already been defined")
  else
    global.GoBoard = _GoBoard
  return
  # see: https://github.com/shichuan/javascript-patterns/blob/master/general-patterns/access-to-global-object.html
  #)(if typeof window is "undefined" then this else window)
)(this)