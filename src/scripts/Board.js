// Generated by CoffeeScript 1.3.3

define(["underscore", "jquery"], function(_, $) {
  var Board;
  Board = (function() {

    Board.EMPTY = 0;

    Board.BLACK = 1;

    Board.WHITE = 2;

    Board.CURRENT_STONE = Board.BLACK;

    function Board(size) {
      var get_this;
      this.size = size;
      this.EMPTY = 0;
      this.BLACK = 1;
      this.WHITE = 2;
      this.CURRENT_STONE = this.BLACK;
      this.KO_POINT = [];
      if (typeof this.size !== "number") {
        this.size = 0;
      }
      get_this = this;
      this.virtual_board = new Array(this.size);
      _.each(_.range(this.size), function(i) {
        get_this.virtual_board[i] = new Array(get_this.size);
        return _.each(_.range(get_this.size), function(j) {
          return get_this.virtual_board[i][j] = get_this.EMPTY;
        });
      });
      return;
    }

    Board.prototype.get_adjacent_points = function(_point) {
      var neighbours, _x, _y;
      _x = _point[0];
      _y = _point[1];
      neighbours = [];
      if (_x > 0) {
        neighbours.push([_x - 1, _y]);
      }
      if (_x < this.size - 1) {
        neighbours.push([_x + 1, _y]);
      }
      if (_y > 0) {
        neighbours.push([_x, _y - 1]);
      }
      if (_y < this.size - 1) {
        neighbours.push([_x, _y + 1]);
      }
      return neighbours;
    };

    Board.prototype.get_color = function(_virtual_board, point) {
      var n_x, n_y;
      n_x = point[0];
      n_y = point[1];
      return _virtual_board[n_x][n_y];
    };

    Board.prototype.set_color = function(_virtual_board, point, _color) {
      var n_x, n_y;
      n_x = point[0];
      n_y = point[1];
      _virtual_board[n_x][n_y] = _color;
      return _virtual_board;
    };

    Board.prototype.get_opposite_color = function(_color) {
      var _color_opp;
      _color_opp = this.EMPTY;
      switch (_color) {
        case this.EMPTY:
          _color_opp = this.EMPTY;
          break;
        case this.WHITE:
          _color_opp = this.BLACK;
          break;
        case this.BLACK:
          _color_opp = this.WHITE;
          break;
        default:
          _color_opp = this.EMPTY;
      }
      return _color_opp;
    };

    Board.prototype.get_chain = function(board_state, _coord) {
      var adjacent_points, chain_info, current_color, fill_color, get_this, popped_coord, stack, virtual_board_clone, virtual_board_size, x, y;
      chain_info = {
        liberties: {},
        chain_members: {}
      };
      current_color = this.get_color(board_state, _coord);
      if (current_color === this.EMPTY) {
        return chain_info;
      }
      virtual_board_clone = $.extend(true, [], board_state);
      fill_color = this.get_opposite_color(current_color);
      stack = [];
      stack.push(_coord);
      chain_info.chain_members[_coord] = _coord;
      virtual_board_size = this.size - 1;
      while (_.size(stack) > 0) {
        popped_coord = stack.pop();
        x = popped_coord[0];
        y = popped_coord[1];
        this.set_color(virtual_board_clone, popped_coord, fill_color);
        adjacent_points = this.get_adjacent_points(popped_coord);
        get_this = this;
        _.each(adjacent_points, function(adjacent_point) {
          if (get_this.get_color(virtual_board_clone, adjacent_point) === current_color) {
            stack.push(adjacent_point);
            chain_info.chain_members[adjacent_point] = adjacent_point;
          }
          if (get_this.get_color(virtual_board_clone, adjacent_point) === get_this.EMPTY) {
            return chain_info.liberties[adjacent_point] = adjacent_point;
          }
        });
      }
      return chain_info;
    };

    Board.prototype.process_move = function(_coord) {
      var adjacent_points, chain_meta, dead_stones, enemy_color, get_this, process_results, virtual_board_clone, virtual_board_hypothetical;
      process_results = {
        legal: true,
        dead: [],
        board_state: this.virtual_board
      };
      if (this.get_color(this.virtual_board, _coord) !== this.EMPTY) {
        process_results.legal = false;
        return process_results;
      }
      if (_coord[0] === this.KO_POINT[0] && _coord[1] === this.KO_POINT[1]) {
        process_results.legal = false;
        return process_results;
      }
      virtual_board_clone = $.extend(true, [], this.virtual_board);
      virtual_board_hypothetical = this.set_color(virtual_board_clone, _coord, this.CURRENT_STONE);
      dead_stones = {};
      adjacent_points = this.get_adjacent_points(_coord);
      enemy_color = this.get_opposite_color(this.CURRENT_STONE);
      get_this = this;
      _.each(adjacent_points, function(adjacent_point) {
        var chain_meta;
        if (get_this.get_color(get_this.virtual_board, adjacent_point) === enemy_color) {
          chain_meta = get_this.get_chain(virtual_board_hypothetical, adjacent_point);
          if (_.size(chain_meta.liberties) === 0) {
            _.each(chain_meta.chain_members, function(member) {
              return dead_stones[member] = member;
            });
            return _.each(dead_stones, function(dead_stone) {
              return virtual_board_hypothetical = get_this.set_color(virtual_board_hypothetical, dead_stone, get_this.EMPTY);
            });
          }
        }
      });
      chain_meta = this.get_chain(virtual_board_hypothetical, _coord);
      if (_.size(chain_meta.liberties) === 0) {
        virtual_board_hypothetical = this.set_color(virtual_board_clone, _coord, this.EMPTY);
        process_results.legal = false;
      }
      _.each(dead_stones, function(dead_stone) {
        return process_results.dead.push(dead_stone);
      });
      process_results.board_state = virtual_board_hypothetical;
      return process_results;
    };

    Board.prototype.move = function(_coord) {
      var move_results, process_results;
      move_results = {
        color: this.EMPTY,
        x: _coord[0],
        y: _coord[1],
        dead: []
      };
      process_results = this.process_move(_coord);
      move_results.dead = $.extend(true, [], process_results.dead);
      this.virtual_board = process_results.board_state;
      if (process_results.legal === true) {
        move_results.color = this.CURRENT_STONE;
        this.CURRENT_STONE = this.get_opposite_color(this.CURRENT_STONE);
      }
      return move_results;
    };

    return Board;

  })();
  return Board;
});