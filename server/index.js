require('dotenv').config()
const express = require('express');
const app = new express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const handlebars = require('express-handlebars');

const router = require('./router.js');
const { gameExists, playersInGame, addPlayer, getGame } = require('./db');

const port = process.env.PORT || 3000;


app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));
app.use(router);


io.on('connection', (socket) => {

  socket.on('join this game', (join) => {
    if (gameExists(join.gameId)) {
      const game = getGame(join.gameId)
      if (game.tiger === '' || game.goat === '') {
        addPlayer(join.gameId, join.player, socket.id);
        io.to(socket.id).emit('player has joined', {player: join.player});
        if (game.playerCount === 1) {
          io.to(socket.id).emit('waiting for other player');
        }
        if (game.playerCount === 2) {
          const players = getGame(join.gameId);
          io.to(players.goat).to(players.tiger).emit('both players have joined');
          io.to(players.goat).to(players.tiger).emit('update board', getGame(join.gameId).board.currentBoardPosition());
          nextTurn(join.gameId);
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
    io.to(game.goat).to(game.tiger).emit('update board', game.board.currentBoardPosition());
    nextTurn(move.gameId);
  });

  socket.on('move piece', (move) => {
    const game = getGame(move.gameId);
    game.board.movePiece(move);
    io.to(game.goat).to(game.tiger).emit('update board', game.board.currentBoardPosition()); 
    nextTurn(move.gameId);
  });
  
});


server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

function nextTurn (gameId) {
  const game = getGame(gameId);
  const checkWinner = game.board.checkWinner();
  if (checkWinner.gameOver === true) {
    io.to(game.goat).to(game.tiger).emit('game over', {winner: checkWinner.winner});
  } else {
    const turn = game.board.getTurn();
    if (turn === 'goats move - Phase 1') {
      const emptySpaces = game.board.emptySpaces();
      io.to(game.goat).emit('place goat', {emptySpaces: emptySpaces});
    }
    if (turn === 'tigers move') {
    const possibleMoves = game.board.getMoves('tiger');
    io.to(game.tiger).emit('tigers turn', {possibleMoves: possibleMoves});
    }
    if (turn === 'goats move - Phase 2') {
      const possibleMoves = game.board.getMoves('goat');
      io.to(game.goat).emit('goats turn', {possibleMoves: possibleMoves});
    }
  }
}
