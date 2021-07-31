const express = require('express');
const app = new express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const baghChal = require('./game');
const port = process.env.PORT | 3000;

app.use(express.static('../public'));

const players = [];

io.on('connection', (socket) => {

  if (players.length < 2) {

    players.push(socket.id);
    io.emit('player has joined', {player: players.length === 1 ? 'Tiger' : 'Goat'})
    console.log(players);

    if (players.length === 2) {
      io.emit('update board', baghChal.currentBoardPosition()); 
      nextTurn();
     }
  } else {
    io.to(socket.id).emit('server full');
    socket.disconnect();
    return;
  }

  socket.on('goat placed', (location) => {
    baghChal.goatPlaced(location.index);
    io.emit('update board', baghChal.currentBoardPosition()); 
    nextTurn();
  });

  socket.on('move piece', (move) => {
    baghChal.movePiece(move);
    io.emit('update board', baghChal.currentBoardPosition()); 
    nextTurn();
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

function nextTurn () {

  const turn = baghChal.getTurn();

  if (turn === 'goats move - Phase 1') {
    const emptySpaces = baghChal.emptySpaces();
    io.to(players[1]).emit('place goat', {emptySpaces: emptySpaces});
  }

  if (turn === 'tigers move') {
  const possibleMoves = baghChal.getMoves('tiger');
  io.to(players[0]).emit('tigers turn', {possibleMoves: possibleMoves});
  }

  if (turn === 'goats move - Phase 2') {
    const possibleMoves = baghChal.getMoves('goat');
    io.to(players[1]).emit('goats turn', {possibleMoves: possibleMoves});
  }
}

module.exports =  { io }; 