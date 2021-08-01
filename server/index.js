const express = require('express');
const app = new express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const handlebars = require('express-handlebars');

const router = require('./router.js');
const { gameExists, playersInGame, addPlayer, getGame } = require('./db');

const port = process.env.PORT | 3000;

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));
app.use(router);


io.on('connection', (socket) => {


  socket.on('join this game', (game) => {
    if (gameExists(game.gameId)) {
      if (playersInGame(game.gameId) < 2) {
        addPlayer(game.gameId, socket.id);
        io.to(socket.id).emit('player has joined', {player: playersInGame(game.gameId) === 1 ? 'Tiger' : 'Goat'});
        if (playersInGame(game.gameId) === 2) {
          const players = getGame(game.gameId).players;
          io.to(players[0]).emit('update board', getGame(game.gameId).board.currentBoardPosition());
          io.to(players[1]).emit('update board', getGame(game.gameId).board.currentBoardPosition()); 
          nextTurn(game.gameId);
        }
      }
    } else {
      io.to(socket.id).emit('server full');
      socket.disconnect();
      return;
    }
  });

  socket.on('goat placed', (move) => {
    const game = getGame(move.gameId);
    game.board.goatPlaced(move.index);
    io.to(game.players[0]).emit('update board', game.board.currentBoardPosition());
    io.to(game.players[1]).emit('update board', game.board.currentBoardPosition());  
    nextTurn(move.gameId);
  });

  socket.on('move piece', (move) => {
    const game = getGame(move.gameId);
    game.board.movePiece(move);
    io.to(game.players[0]).emit('update board', game.board.currentBoardPosition());
    io.to(game.players[1]).emit('update board', game.board.currentBoardPosition());  
    nextTurn(move.gameId);
  });

  socket.on('capture goat', (move) => {
    baghChal.captureGoat(move);
    io.emit('update board', baghChal.currentBoardPosition()); 
    nextTurn();
  });
  
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

function nextTurn (gameId) {
  const game = getGame(gameId);
  const turn = game.board.getTurn();

  if (turn === 'goats move - Phase 1') {
    const emptySpaces = game.board.emptySpaces();
    io.to(game.players[1]).emit('place goat', {emptySpaces: emptySpaces});
  }

  if (turn === 'tigers move') {
  const possibleMoves = game.board.getMoves('tiger');
  io.to(game.players[0]).emit('tigers turn', {possibleMoves: possibleMoves});
  }

  if (turn === 'goats move - Phase 2') {
    const possibleMoves = game.board.getMoves('goat');
    io.to(game.players[1]).emit('goats turn', {possibleMoves: possibleMoves});
  }
}

module.exports =  { io }; 