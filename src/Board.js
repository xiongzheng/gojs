// Generated by CoffeeScript 1.4.0

define(function(require) {
  var $, Board, BoardState, History, _;
  $ = require('jquery');
  _ = require('underscore');
  History = require('History');
  BoardState = require('BoardState');
  Board = (function() {

    Board.EMPTY = 0;

    Board.BLACK = 1;

    Board.WHITE = 2;

    Board.prototype.isNumber = function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };

    function Board(size, CURRENT_STONE) {
      var get_this;
      this.size = size;
      this.CURRENT_STONE = CURRENT_STONE;
      this.EMPTY = 0;
      this.BLACK = 1;
      this.WHITE = 2;
      this.KR = 0;
      this.PSK = 1;
      this.SSK = 2;
      this.REPETITION_RULE = this.SSK;
      if (!this.isNumber(this.size)) {
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
      this.history = new History(this.virtual_board);
      return;
    }

    Board.prototype.set_starting_board_state = function(CURRENT_STONE) {
      this.CURRENT_STONE = CURRENT_STONE;
      if ((typeof moo !== "undefined" && moo !== null) === true && (this.CURRENT_STONE === this.BLACK || this.CURRENT_STONE === this.WHITE)) {
        this.history = new History(this.virtual_board);
        return true;
      }
      return false;
    };

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
        virtual_board_clone = this.set_color(virtual_board_clone, popped_coord, fill_color);
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

    Board.prototype.check_ko_rule = function() {
      var board_state_difference, current_board_state, key, num_board_states, previous_board_state, stone_being_captured, stone_being_captured_color, stones_added, truth_test;
      num_board_states = this.history.getNumBoardStates();
      if (_.size(dead_stones) === 1 && num_board_states >= 2) {
        current_board_state = this.history.goBack(0);
        previous_board_state = this.history.goBack(1);
        board_state_difference = this.history.difference(previous_board_state, current_board_state);
        key = _.keys(dead_stones);
        stone_being_captured = dead_stones[key[0]];
        stone_being_captured_color = this.virtual_board[stone_being_captured[0]][stone_being_captured[1]];
        stones_added = [];
        if (stone_being_captured_color === this.BLACK) {
          stones_added = board_state_difference.stones_added.BLACK;
        } else if (stone_being_captured_color === this.WHITE) {
          stones_added = board_state_difference.stones_added.WHITE;
        }
        truth_test = _.find(stones_added, function(coord) {
          return coord[0] === stone_being_captured[0] && coord[1] === stone_being_captured[1];
        });
        if (truth_test) {
          if ((_.size(board_state_difference.stones_removed.BLACK) + _.size(board_state_difference.stones_removed.WHITE)) === 1) {
            console.log("ko rule violated");
            return false;
          } else {
            return true;
          }
        }
      }
      return true;
    };

    Board.prototype.check_psk = function(virtual_board_hypothetical) {
      var hypothetical_board_state, hypothetical_board_state_hash, _ref;
      hypothetical_board_state = new BoardState(virtual_board_hypothetical, this.CURRENT_STONE);
      hypothetical_board_state_hash = hypothetical_board_state.getHash();
      if (((_ref = this.history.getBoardState(hypothetical_board_state_hash)) != null ? _ref.getHash().toString().length : void 0) > 0) {
        return false;
      }
      return true;
    };

    Board.prototype.check_ssk = function(virtual_board_hypothetical) {
      var board_state_test, board_state_test_hash, hypothetical_board_state, hypothetical_board_state_hash;
      hypothetical_board_state = new BoardState(virtual_board_hypothetical, this.CURRENT_STONE);
      hypothetical_board_state_hash = hypothetical_board_state.getHash();
      board_state_test = this.history.getBoardState(hypothetical_board_state_hash);
      board_state_test_hash = board_state_test != null ? board_state_test.getHash() : void 0;
      if (typeof board_state_test_hash !== 'undefined') {
        /*
                # check if it was the opponent's turn to move next
                board_state_test_hash_index = _.lastIndexOf(@history.history_hash_order, board_state_test_hash)
        
                # board_state may be the previous one! (i.e passed)
                # if it is, the next turn is obviously the opponent's
                if board_state_test_hash_index == @history.getNumBoardStates() - 1
                  return false
        
                board_state_test_next = @history.getBoardStateFromIndex(board_state_test_hash_index+1)
                if board_state_test_next?.getWhoMoved() is @get_opposite_color(@CURRENT_STONE)
                  # SSK rule violated
                  return false
        */

        if ((board_state_test != null ? board_state_test.getWhoMoved() : void 0) === this.CURRENT_STONE) {
          return false;
        }
      }
      return true;
    };

    /*
        # For Natural situational superko, passes may matter
        # http://www.lifein19x19.com/forum/viewtopic.php?f=45&t=1479
    
        1. All the superko rules allow this order of plays: Black first creates a position by playing a stone, then re-creates it by passing. 
        But natural situational superko also allows the other order: Black first creates a position by passing, then re-creates it by playing a stone.
    
        2. A player may not play a stone so as to create a board position which existed previously in the game, 
        if s/he played (placed a stone) to create it previously.
    
        http://home.snafu.de/jasiek/superko.html
        3. A player may not use a board play (plcing a stone; pass play is not a board play) to recreate a position if he has used one to create it.
    */


    Board.prototype.check_nssk = function(virtual_board_hypothetical) {
      var board_state_test, board_state_test_hash, board_state_test_hash_index, board_state_test_next, hypothetical_board_state, hypothetical_board_state_hash;
      hypothetical_board_state = new BoardState(virtual_board_hypothetical, this.CURRENT_STONE);
      hypothetical_board_state_hash = hypothetical_board_state.getHash();
      board_state_test = this.history.getAllBoardStates(hypothetical_board_state_hash);
      board_state_test_hash = board_state_test != null ? board_state_test.getHash() : void 0;
      if (this.isNumber(board_state_test_hash)) {
        board_state_test_hash_index = _.lastIndexOf(this.history.history_hash_order, board_state_test_hash);
        if (board_state_test_hash_index === this.history.getNumBoardStates() - 1) {
          return false;
        }
        board_state_test_next = this.history.getBoardStateFromIndex(board_state_test_hash_index + 1);
        if ((board_state_test_next != null ? board_state_test_next.getWhoMoved() : void 0) === this.get_opposite_color(this.CURRENT_STONE)) {
          return false;
        } else {
          return true;
        }
      }
      return true;
      process_results.board_state = virtual_board_hypothetical;
      return process_results;
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
      virtual_board_clone = $.extend(true, [], this.virtual_board);
      /*
            start board play logic
      */

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
      /*
            end board play logic
      */

      if (process_results.legal === true) {
        if (this.REPETITION_RULE === this.KR) {
          if (this.check_ko_rule() === false) {
            process_results.legal = false;
          }
        }
        if (this.REPETITION_RULE === this.PSK) {
          if (this.check_psk(virtual_board_hypothetical) === false) {
            process_results.legal = false;
          }
          if (process_results.legal === false) {
            console.log("PSK violated at " + _coord);
          }
        }
        if (this.REPETITION_RULE === this.SSK) {
          if (this.check_ssk(virtual_board_hypothetical) === false) {
            process_results.legal = false;
          }
          if (process_results.legal === false) {
            console.log("SSK violated at " + _coord);
          }
        }
      }
      /*
            # For Natural situational superko, passes may matter
            # http://www.lifein19x19.com/forum/viewtopic.php?f=45&t=1479
      
            1. All the superko rules allow this order of plays: Black first creates a position by playing a stone, then re-creates it by passing. 
            But natural situational superko also allows the other order: Black first creates a position by passing, then re-creates it by playing a stone.
      
            2. A player may not play a stone so as to create a board position which existed previously in the game, 
            if s/he played to create it previously.
      */

      if (this.REPETITION_RULE === this.NSSK) {
        if (this.check_nssk(virtual_board_hypothetical) === false) {
          process_results.legal = false;
        }
      }
      if (process_results.legal === true) {
        _.each(dead_stones, function(dead_stone) {
          return process_results.dead.push(dead_stone);
        });
      }
      process_results.board_state = virtual_board_hypothetical;
      return process_results;
    };

    Board.prototype.place = function(_coord, _color) {
      var place_results;
      place_results = {
        color: this.EMPTY,
        x: _coord[0],
        y: _coord[1]
      };
      if (this.get_color(this.virtual_board, _coord) !== this.EMPTY) {
        return place_results;
      } else if (_color === this.BLACK || _color === this.WHITE) {
        this.virtual_board = this.set_color(this.virtual_board, _coord, _color);
        place_results.color = _color;
      }
      return place_results;
    };

    Board.prototype.pass = function() {
      var pass_results;
      pass_results = {
        color: this.CURRENT_STONE,
        legal: true
      };
      this.history.add(this.virtual_board, this.CURRENT_STONE);
      this.CURRENT_STONE = this.get_opposite_color(this.CURRENT_STONE);
      return pass_results;
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
      if (process_results.legal === true) {
        this.virtual_board = process_results.board_state;
        this.history.add(this.virtual_board, this.CURRENT_STONE);
        move_results.color = this.CURRENT_STONE;
        this.CURRENT_STONE = this.get_opposite_color(this.CURRENT_STONE);
      }
      return move_results;
    };

    return Board;

  })();
  return Board;
});
