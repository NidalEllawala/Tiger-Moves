const Handlebars = require("handlebars");
const { storage } = require('../db');
const { createNewGame } = require('../db');


function home (req, res) {
  res.render('home');
}

function newGame (req, res) {
  const rndm = Math.floor(Math.random()*100000+1).toString();
  createNewGame(rndm);
  res.render('home', {uid: rndm});
}

function join (req, res) {
  res.render('home', {join: true});
}

function playGame (req, res) {
  const gameId = req.params.id;
  res.render('game', {gameId: gameId});
}

function joinGame (req, res) {
  res.status(200).redirect(`/playgame/${req.body.id}`);
}

module.exports = { joinGame, home, playGame, newGame, join };