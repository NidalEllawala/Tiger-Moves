let gameId;
let player;
let tmp = {};
let currentMove = {from: '', to: '', gameId};

document.addEventListener('DOMContentLoaded', () => {

  const socket = io({autoConnect: false});

  onStart();

  socket.on('player has joined', (data) => {
    document.getElementById('message').innerHTML = `${data.player} has joined`;
  });

  socket.on('waiting for other player', () => {
    addMessage(player, 'waiting for other player to join');
  });

  socket.on('both players have joined', () => {
    addMessage(player, 'Both players have joined! Time to start playing');
    if (player === 'tiger') {
      document.getElementById('goat-turn').classList.add('is-primary');
    } else {
      document.getElementById('tiger-turn').classList.add('is-primary');
    }
  });
  

  socket.on('server full', () => {
    alert('server is full. socket connection rejected');
  });

  socket.on('update board', updateBoard); 
  
  socket.on('place goat', placeGoat);

  socket.on('tigers turn', findPieces);

  socket.on('goats turn', findPieces);

  socket.on('game over', gameOver);

  function onStart () {
    gameId = document.getElementById('game-id').value;
    player = document.getElementById('player').value;
    document.getElementById('sng').addEventListener('click', () => {
      console.log(player);
      socket.connect();
      socket.emit('join this game', {gameId: gameId, player: player});
    });
  }


  function placeGoat (board) {
    changeTurnDisplay();
    for (let space of board.emptySpaces) {
      const element = document.getElementById(`${space}`);
      element.classList.add('highlight');
      element.addEventListener('click', goatPlaced);
    }
  }

  function goatPlaced (event) {
    removeListeners('highlight', goatPlaced);
    //changeTurnDisplay();
    socket.emit('goat placed', {index: event.target.id,
      gameId: gameId
    });
  }


  function findPieces (board) {
    //changeTurnDisplay();
    if (tmp.possibleMoves == undefined) {
      tmp = board;
    }
    for (let move of board.possibleMoves) {
      const piece = document.getElementById(`${move.from}`);
      if (move.to.length) {
        piece.dataset.moves = move.to.toString();
      } else {
        piece.dataset.moves = '';
      }
      if (move.capture.length) {
        piece.dataset.capture = move.capture.toString();
      } else {
        piece.dataset.capture = '';
      }
      piece.classList.add('highlight');
      piece.addEventListener('click', selectPiece);
    }
  };

  function selectPiece (event) {
    removeListeners('highlight', selectPiece);
    event.target.classList.add('highlight');
    currentMove.from = event.target.id;
    event.target.addEventListener('click', deselectPiece); 
    if (event.target.dataset.moves != '') {
      const moves = event.target.dataset.moves.split(',');
      moves.forEach((move) => {
        const moveTo = document.getElementById(`${move}`);
        moveTo.classList.add('move-piece');
        moveTo.addEventListener('click', movePiece);
      });
    }
    if (event.target.dataset.capture != '') {
      const capture = event.target.dataset.capture.split(',');
      capture.forEach((move) => {
        const moveTo = document.getElementById(`${move}`);
        moveTo.classList.add('capture');
        moveTo.addEventListener('click', capturePiece);
      });
    }
  }

  function movePiece (event) {
    //console.log('movePiece');
    removeListeners('move-piece', movePiece);
    removeListeners('capture', capturePiece);
    removeListeners('highlight', deselectPiece);
    //changeTurnDisplay();

    currentMove.to = event.target.id;
    currentMove.capture = false;
    currentMove.gameId = gameId;
    socket.emit('move piece', currentMove);

    currentMove = {};
    tmp = {};
  }

  function capturePiece (event) {
    removeListeners('move-piece', movePiece);
    removeListeners('capture', capturePiece);
    removeListeners('highlight', deselectPiece);
    //changeTurnDisplay();

    currentMove.to = event.target.id;
    currentMove.capture = true;
    currentMove.gameId = gameId;
    socket.emit('move piece', currentMove);

    currentMove = {};
    tmp = {};
  }

  function deselectPiece () {
    removeListeners('move-piece', movePiece);
    removeListeners('capture', capturePiece);
    currentMove.from = '';
    findPieces(tmp);
  }

  function removeListeners(from, functionUsed) {
    const remove_from = document.querySelectorAll(`.${from}`);  
    remove_from.forEach( (el) => {
      el.removeEventListener('click', functionUsed);
      el.classList.remove(from);
    });
  }

  function updateBoard (board) {
    console.log(board);
    const all = document.querySelectorAll('.default');
    all.forEach( (el) => {
      el.innerHTML = '';
    });
    for (let index of board.tigers) {
      document.getElementById(`${index}`).innerHTML = '&#9899'
    }
    for (let index of board.goats) {
      document.getElementById(`${index}`).innerHTML = '&#9898'
    }
    document.getElementById('goats-remaining').innerHTML = board.score.goatsRemaining;
    document.getElementById('goats-captured').innerHTML = board.score.goatsCaptured;
    document.getElementById('tigers-trapped').innerHTML = board.score.tigersTrapped;
  }

  function gameOver (result) {
    document.getElementById('message').innerHTML = `Game Over - ${result.winner} has won`;

    //enable link to play another game
  }

  function changeTurnDisplay () {
    document.getElementById('tiger-turn').classList.toggle('is-primary');
    document.getElementById('goat-turn').classList.toggle('is-primary');
  }

  function addMessage (messageTo, message) {

    if (player === messageTo) {
      let p = document.createElement('p');
      p.innerHTML = message;
      document.getElementById('message').append(p);
    }
  }
});

