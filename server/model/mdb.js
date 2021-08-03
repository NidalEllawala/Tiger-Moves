const { GameBoard } = require('./gameboard');
const { Game } = require('./index');
const storage = { games: {} };

async function TestNewGame () {
  const newBoard = new GameBoard();
  let newGame = new Game({
    playerCount: 0,
    isTaken: 'tiger',
    tiger: '',
    goat: '',
    board: newBoard
  });
  newGame = await newGame.save();
  return newGame;
}

function createNewGame (id, player) {
  storage.games[id] = {
    board: new board(),
    playerCount: 0,
    isTaken: player,
    tiger: '',
    goat: ''
  }
}

function gameExists (id) {
  if (storage.games[id] != undefined) {
    return true;
  } else {
    return false;
  }
}

function playersInGame (id) {
  return storage.games[id].playerCount;
}

function addPlayer (id, player, socketId) {
  storage.games[id][player] = socketId;
  storage.games[id].playerCount += 1;
}

function getGame (id) {
  return storage.games[id];
}

module.exports = { TestNewGame };