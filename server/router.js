const express = require('express');
const router = express.Router();

///////////for testing//////////////////////////////////
const { newGameDB } = require('./controllers/controllersdb');
/////////////////////////////////////////////////////////

const { 
  joinGame, 
  home, 
  newGame, 
  join, 
  playGame,
} = require('./controllers/controllers')

router.get('/', home)

router.post('/getnewid', newGame);

router.get('/join', join);

router.post('/joingame', joinGame);

router.get('/playgame/:id/:player', playGame);

///////////////////////////////////////////////////
router.get('/testinggetnewid', newGameDB);

///////////////////////////////////////////////////

module.exports = router;