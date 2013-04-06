define ["dojox/gfx","dojox/gfx/utils", "dojo/_base/lang", "dojo/dom"], (gfx, utils, lang, dom) ->

  class Board

    # class variables
    @EMPTY: 0
    @BLACK: 1
    @WHITE: 2

    isNumber: (n) ->
      return !isNaN(parseFloat(n)) && isFinite(n)

    constructor: (@size, @CURRENT_STONE) ->
      return

  class GoBoard

    VERSION: '0.2'

    constructor: (@container, @container_size, @board_size) ->

      # validate params

      isNumber = (n) ->
        return !isNaN(parseFloat(n)) && isFinite(n)

      # check if params are of valid type
      if !lang.isString(@container) or !isNumber(@container_size) or !isNumber(@board_size)
        return

      # check if container exists
      if !(dom.byId(@container)?)
        return

      if @container_size <= 0
        return

      if @container_size <= 0
        return

      if @board_size > 19
        @board_size = 19

      if @board_size <= 1
        return

      # Create virtual go board
      i = @board_size
      @virtual_board = new Array(@board_size)
      while i-- > 0
        @virtual_board[i] = new Array(@board_size)
        j = @board_size
        while j-- > 0
          @virtual_board[i][j] = null


      get_this = this

      # Render go board


      # fundamental variables
      board_size = @board_size # n X n board
      cell_radius = 25
      circle_radius = 0.50 * cell_radius
      text_size = 15 #pixels

      ###

      from board_outline to canvas edge:
      circle_radius
      circle_radius/2
      text_size
      circle_radius/2

      bottom/left: r+r/2 + text_size
      top/right: r+r/2

      ###

      text_buffer = 2*circle_radius + text_size 
      text_movement = 3*circle_radius/2

      canvas_length = (cell_radius * (@board_size - 1)) + text_buffer * 2

      # coord of top left of board outline
      y = text_buffer * 1 # top-left x
      x = text_buffer # top-left y

      # create canvas (surface)
      surface = gfx.createSurface(@container, @container_size, @container_size)


      group = surface.createGroup()

      # scaling
      ratio = @container_size/canvas_length
      group.applyTransform(gfx.matrix.scale({ x: ratio, y: ratio }))
      
      # create board outline
      board_outline_length = cell_radius * (@board_size - 1)
      board_outline = group.createRect({ x: x, y: y, width: board_outline_length, height: board_outline_length }).setStroke({color: "black", width: 2})


      click_detect_group = group.createGroup()


      # Create virtual board_size
      handle_click = (shape, evt) ->
        coord_x = (shape.shape.x - x + cell_radius / 2)/cell_radius
        coord_y = board_size-1-(shape.shape.y - y + cell_radius / 2)/cell_radius

        if get_this.virtual_board[coord_y][coord_x] is null

          stone = group.createGroup()

          # place stone
          x_1 = shape.shape.x+circle_radius
          y_1 = shape.shape.y+circle_radius
          ###
          circle_fg = stone.createCircle({ cx: x_1, cy: y_1, r:circle_radius }).setFill(
            type: "radial"
            cx: x_1 #+ circle_radius*0.2
            cy: y_1 #+ circle_radius*0.3
            r: circle_radius*1.2
            colors: [
              offset: 0
              color: "#F0F0F0"
            ,
              offset: 0.25
              color: "#E8E8E8"
            ,
              offset: 0.5
              color: "#E0E0E0"
            ,      
              offset: 0.75
              color: "#D8D8D8"
            ,                        
              offset: 0.9
              color: "#989898"
            ]
          ).setStroke("#989898")
          ###
          

          circle_fg = stone.createCircle({ cx: x_1, cy: y_1, r:circle_radius }).setFill(
            type: "radial"
            cx: x_1 + circle_radius*0.2
            cy: y_1 #+ circle_radius*0.3
            r: circle_radius*1.4
            colors: [
              offset: 0
              color: "#484848"
            ,      
              offset: 0.9
              color: "#000"
            ]
          )#.setStroke("#484848")
          

          #circle_fg = stone.createCircle({ cx: x_1, cy: y_1, r:circle_radius }).setFill("#383838").setStroke("#000")
          # remember placed stone
          get_this.virtual_board[coord_y][coord_x] = stone

          click_detect_group.moveToFront()
        else
          console.log "cannot place stone!"

        return



      # Put stuff on the board
      index = 0
      while index < board_size

        i = index
        # construct lines
        # ignore outlines
        if index < board_size - 2

          shift = cell_radius * (index + 1)

          # vertical line
          x_1 = x + shift
          y_1 = y + cell_radius * (board_size - 1)
          group.createLine({ x1: x_1, y1: y_1, x2: x_1, y2: y }).setStroke("black").moveToBack()

          # horizontal line
          y_1 = y + shift
          x_1 = x + cell_radius * (board_size - 1)
          group.createLine({ x1: x, y1: y_1, x2: x_1, y2: y_1 }).setStroke("black").moveToBack()

        # Letter labels
        letter = String.fromCharCode(65 + index)
        x_1 = x+cell_radius * (index)

        # bottom
        group.createText({ x: x_1, y: y + cell_radius * (board_size - 1) + text_size + text_movement, text: letter, align: "middle"}).setFont({ family: "Arial", size: text_size+"px"}).setFill("black")
        
        # top
        group.createText({ x: x_1, y: y - text_movement, text: letter, align: "middle"}).setFont({ family: "Arial", size: text_size+"px"}).setFill("black")


        # Number labels
        y_1 = y + cell_radius * (@board_size - 1 - index) + text_size/2

        # Left
        group.createText({ x: x - (text_movement+text_size/2), y: y_1, text: index+1, align: "middle"}).setFont({ family: "Arial", size: text_size+"px"}).setFill("black")

        # Right
        group.createText({ x: x + cell_radius * (@board_size - 1) + (text_movement+text_size/2), y: y_1, text: index+1, align: "middle"}).setFont({ family: "Arial", size: text_size+"px"}).setFill("black")


        # Place click detectors
        j = 0
        while j < board_size
          x_1 = x - cell_radius / 2 + cell_radius * i
          y_1 = y - cell_radius / 2 + cell_radius * j

          click = click_detect_group.createRect({ x: x_1, y: y_1, width: cell_radius, height: cell_radius }).setFill([0,0,255,0.0]).moveToFront()
          @myConnect(click, "onclick", handle_click)

          j++
        index++

      return



    myConnect: (shape, eventName, handler, context) ->
      shape.connect(eventName, lang.hitch(context, handler, shape))
      return

  return GoBoard
