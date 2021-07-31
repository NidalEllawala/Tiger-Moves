

///////// GAME STATE VARIABLES /////////
let { board } = require('./board');
let turn = 1;
const totalGoats = 3;
const totalTigers = 4;
let goatsPlaced = 0;
let goatsCaptured = 0;
let tigersTrapped = 0;
///////////////////////////////////////

function currentBoardPosition () {
  const tigers = [];
  const goats = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i].contains === 'tiger') {
      tigers.push(i);
    } else if (board[i].contains === 'goat') {
      goats.push(i);
    }
  }
  return {
    tigers: tigers, 
    goats: goats, 
    score: { 
      goatsRemaining: totalGoats - goatsPlaced,
      goatsCaptured: goatsCaptured,
      tigersTrapped: tigersTrapped
     } 
    };
}

function emptySpaces () {
  const empty = [];
  for (let i = 0; i  < board.length; i++) {
    if (board[i].contains === 'empty') {
      empty.push(i);
    }
  }
  return empty;
}

function goatPlaced (index) {
  board[index].contains = 'goat';
  turn += 1;
  goatsPlaced += 1;
}

function getMoves (player) {
  const possibleMoves = [];
  for (let i = 0; i < board.length; i++) {
    let move = {to: [], capture: []};
    if (board[i].contains === player) {
      move.from = i;
      board[i].possible_moves.forEach( (el, index) => {
        if (board[el].contains === 'empty') {
          move.to.push(el);
        } else if (player === 'tiger' && board[el].contains === 'goat') {
          if (board[i].capture[index] != null && board[board[i].capture[index]].contains === 'empty') {
            move.capture.push(board[i].capture[index]);
          }
        } 
      });
      if (move.to.length || move.capture.length) {
        possibleMoves.push(move);
      }
    }
  }
  if (player === 'tiger') {
    tigersTrapped = totalTigers - possibleMoves.length;
  }
  return possibleMoves;
}

function movePiece (move) {
  board[move.to].contains = board[move.from].contains;
  board[move.from].contains = 'empty';
  turn += 1;
  if (move.capture) {
    board[board[move.from].possible_moves[board[move.from].capture.indexOf(parseInt(move.to))]].contains = 'empty';
    goatsCaptured += 1;
  }
}


function getTurn () {
  if (turn %2 != 0) {
    if (goatsPlaced < totalGoats) {
      return 'goats move - Phase 1';
    } else {
      return 'goats move - Phase 2';
    }
  } else {
    return 'tigers move';
  }
}

module.exports = { 
  movePiece, 
  currentBoardPosition, 
  emptySpaces, 
  goatPlaced, 
  getMoves, 
  getTurn,
}