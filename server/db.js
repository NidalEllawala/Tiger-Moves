const { board } = require('./board');
const storage = { games: {} };

function createNewGame (id) {
  storage.games[id] = { 
    board: new board(),
    players: []
  }
  console.log(Object.keys(storage.games));
}

function gameExists (id) {
  if (storage.games[id] != undefined) {
    return true;
  } else {
    return false;
  }
}

function playersInGame (id) {
  return storage.games[id].players.length;
}

function addPlayer (id, socketId) {
  storage.games[id].players.push(socketId);
}

function getGame (id) {
  return storage.games[id];

}

module.exports = { getGame, addPlayer, playersInGame, gameExists, createNewGame, storage };