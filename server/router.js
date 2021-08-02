const express = require('express');
const router = express.Router();

const { 
  joinGame, 
  home, 
  newGame, 
  join, 
  playGame 
} = require('./controllers/controllers')


router.get('/', home)

router.post('/getnewid', newGame);

router.get('/join', join);

router.post('/joingame', joinGame);

router.get('/playgame/:id/:player', playGame);

module.exports = router;