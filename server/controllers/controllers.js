const { createNewGame, getGame } = require('../db');


function home (req, res) {
  res.render('home');
}

function newGame (req, res) {
  try {
    const choice = req.body['choose-player'];
    const rndm = Math.floor(Math.random()*100000+1).toString();
    createNewGame(rndm, choice);
    res.render('home', {uid: rndm, choice: choice});
  } catch (err) {
    res.status(500);
    res.send('Internal server error');
  }
}

function join (req, res) {
  res.render('home', {join: true});
}

function playGame (req, res) {
  try {
    const gameId = req.params.id;
    const choice = req.params.player;
    res.render('game', {gameId: gameId, player: choice});
  } catch (err) {
    res.status(500);
    res.send('Internal server error');
  }
}

function joinGame (req, res) {
  try {
    const gameId = req.body.id;
    const joining = getGame(gameId);
    const player = (joining.isTaken === 'tiger' ? 'goat' : 'tiger');
    res.status(200).redirect(`/playgame/${gameId}/${player}`);
  } catch (error) {
    res.status(500);
    res.send('Internal server error');
  }
}

module.exports = { joinGame, home, playGame, newGame, join };