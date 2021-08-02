const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/codemocracy`, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  gameId: Number,
  board: [{
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

const Games = mongoose.model('BaghChal', gameSchema);


module.exports =  Games;