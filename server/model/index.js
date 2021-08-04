const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });


const Schema = mongoose.Schema;

const gameSchema = new Schema({
  gameId: Number, 
  game: [{
    turn: Number,
    totalGoats: Number,
    totalTigers: Number,
    goatsPlaced: Number,
    goatsCaptured: Number,
    tigersTrapped: Number,
    towinTiger: Number,
    towinGoat: Number,
    gameOver: Boolean,
    winner: String,
    board: [{
      contains: String,
      possible_moves: [Number],
      capture: [Number]
    }]
  }],
  playerCount: Number,
  isTaken: String,
  tiger: String,
  goat: String,
});

const Game = mongoose.model('BaghChal', gameSchema);


module.exports =  { Game };