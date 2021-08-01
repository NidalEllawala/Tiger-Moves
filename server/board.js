



//es6 export default did not work
class board {
    constructor () {
        this.turn = 1;
        this.totalGoats = 3;
        this.totalTigers = 4;
        this.goatsPlaced = 0;
        this.goatsCaptured = 0;
        this.tigersTrapped = 0;
        this.board = 
        [
          {
              "contains": "tiger",
              "possible_moves": [1, 5, 6],
              "capture": [2, 10, 12]
          },
        
          {
              "contains": "empty",
              "possible_moves": [0, 2, 6],
              "capture": [null, 3, 11]
          },
        
          {
              "contains": "empty",
              "possible_moves": [1, 3, 6, 7, 8],
              "capture": [0, 4, 10, 12, 14]
          },
        
          {
              "contains": "empty",
              "possible_moves": [2, 4, 8],
              "capture": [1, null, 13]
          },
        
          {
              "contains": "tiger",
              "possible_moves": [3, 8, 9],
              "capture": [2, 12, 14]
          },
        
          {
              "contains": "empty",
              "possible_moves": [0, 6, 10],
              "capture": [null, 7, 15]
          },
        
          {
              "contains": "empty",
              "possible_moves": [0, 1, 2, 5, 7, 10, 11, 12],
              "capture": [null, null, null, null, 8, null, 16, 18]
          },
        
          {
              "contains": "empty",
              "possible_moves": [2, 6, 8, 12],
              "capture": [null, 5, 9, 17]
          },
        
          {
              "contains": "empty",
              "possible_moves": [2, 3, 4, 7, 9, 12, 13, 14],
              "capture": [null, null, null, 6, null, 16, 18, null]
          },
        
          {
              "contains": "empty",
              "possible_moves": [4, 8, 14],
              "capture": [null, 7, 19]
          },
        
          {
              "contains": "empty",
              "possible_moves": [5, 6, 11, 15, 16],
              "capture": [0, 2, 12, 20, 22]
          },
          
          {
              "contains": "empty",
              "possible_moves": [6, 10, 12, 16],
              "capture": [1, null, 13, 21]
          },
        
          {
              "contains": "empty",
              "possible_moves": [6, 7, 8, 11, 13, 16, 17, 18],
              "capture": [0, 2, 4, 10, 14, 20, 22, 24]
          },
        
          {
              "contains": "empty",
              "possible_moves": [8, 12, 14, 18],
              "capture": [3, 12, null, 23]
          },
        
          {
              "contains": "empty",
              "possible_moves": [8, 9, 13, 18, 19],
              "capture": [2, 4, 12, 22, 24]
          },
        
          {
              "contains": "empty",
              "possible_moves": [10, 16, 20],
              "capture": [5, 17, null]
          },
        
          {
              "contains": "empty",
              "possible_moves": [10, 11, 12, 15, 17, 20, 21, 22],
              "capture": [null, 6, 8, null, 18, null, null, null]
          },
        
          {
              "contains": "empty",
              "possible_moves": [12, 16, 18, 22],
              "capture": [7, 15, 19, null]
          },
        
          {
              "contains": "empty",
              "possible_moves": [12, 13, 14, 17, 19, 22, 23, 24],
              "capture": [6, 8, null, 16, null, null, null, null]
          },
        
          {
              "contains": "empty",
              "possible_moves": [14, 18, 24],
              "capture": [9, 17, null]
          },
        
          {
              "contains": "tiger",
              "possible_moves": [15, 16, 21],
              "capture": [10, 12, 22]
          },
        
          {
              "contains": "empty",
              "possible_moves": [16, 20, 22],
              "capture": [11, null, 23]
          },
        
          {
              "contains": "empty",
              "possible_moves": [16, 17, 18, 21, 23],
              "capture": [10, 12, 14, 20, 24]
          },
        
          {
              "contains": "empty",
              "possible_moves": [18, 22, 24],
              "capture": [13, 20, null]
          },
        
          {
              "contains": "tiger",
              "possible_moves": [18, 19, 23],
              "capture": [12, 14, 22]
          },
        ]
    }

    //methods go here
    currentBoardPosition () {
        const tigers = [];
        const goats = [];
        for (let i = 0; i < this.board.length; i++) {
          if (this.board[i].contains === 'tiger') {
            tigers.push(i);
          } else if (this.board[i].contains === 'goat') {
            goats.push(i);
          }
        }
        return {
          tigers: tigers, 
          goats: goats, 
          score: { 
            goatsRemaining: this.totalGoats - this.goatsPlaced,
            goatsCaptured: this.goatsCaptured,
            tigersTrapped: this.tigersTrapped
           } 
          };
      }

      emptySpaces () {
        const empty = [];
        for (let i = 0; i  < this.board.length; i++) {
          if (this.board[i].contains === 'empty') {
            empty.push(i);
          }
        }
        return empty;
      }
      
      goatPlaced (index) {
        this.board[index].contains = 'goat';
        this.turn += 1;
        this.goatsPlaced += 1;
      }
      
      getMoves (player) {
        const possibleMoves = [];
        for (let i = 0; i < this.board.length; i++) {
          let move = {to: [], capture: []};
          if (this.board[i].contains === player) {
            move.from = i;
            this.board[i].possible_moves.forEach( (el, index) => {
              if (this.board[el].contains === 'empty') {
                move.to.push(el);
              } else if (player === 'tiger' && this.board[el].contains === 'goat') {
                if (this.board[i].capture[index] != null && this.board[this.board[i].capture[index]].contains === 'empty') {
                  move.capture.push(this.board[i].capture[index]);
                }
              } 
            });
            if (move.to.length || move.capture.length) {
              possibleMoves.push(move);
            }
          }
        }
        if (player === 'tiger') {
          this.tigersTrapped = this.totalTigers - possibleMoves.length;
        }
        return possibleMoves;
      }

      movePiece (move) {
        this.board[move.to].contains = this.board[move.from].contains;
        this.board[move.from].contains = 'empty';
        this.turn += 1;
        if (move.capture) {
          this.board[this.board[move.from].possible_moves[this.board[move.from].capture.indexOf(parseInt(move.to))]].contains = 'empty';
          this.goatsCaptured += 1;
        }
      }

      getTurn () {
        if (this.turn %2 != 0) {
          if (this.goatsPlaced < this.totalGoats) {
            return 'goats move - Phase 1';
          } else {
            return 'goats move - Phase 2';
          }
        } else {
          return 'tigers move';
        }
      }

/////////////////    
}



module.exports = { board };