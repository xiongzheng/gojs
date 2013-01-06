// Generated by CoffeeScript 1.4.0

(function(global) {
  var _GoBoard;
  _GoBoard = (function() {

    function _GoBoard(container, container_size, board_size) {
      var get_this;
      this.container = container;
      this.container_size = container_size;
      this.board_size = board_size;
      get_this = this;
      require(["gojs/main"], function(_GoBoard) {
        get_this.go_board = new _GoBoard(container, container_size, board_size);
      });
    }

    return _GoBoard;

  })();
  if (global.GoBoard) {
    throw new Error("GoBoard has already been defined");
  } else {
    global.GoBoard = _GoBoard;
  }
})(this);
