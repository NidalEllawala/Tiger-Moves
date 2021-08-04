const mongoose = require('mongoose');


mongoose.connect(`mongodb://localhost:27017/codemocracy`, { useNewUrlParser: true, useUnifiedTopology: true});


const Schema = mongoose.Schema;

const gameSchema = new Schema({ 
  playerCount: Number,
  isTaken: String,
  tiger: String,
  goat: String,
  game: {
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
  board: [{ contains: String, possible_moves: [Number], capture: [Number], _id: false}],
  }
});

const Game = mongoose.model('BaghChal', gameSchema);


module.exports =  { Game };

//game: [{
  // turn: Number,
  // totalGoats: Number,
  // totalTigers: Number,
  // goatsPlaced: Number,
  // goatsCaptured: Number,
  // tigersTrapped: Number,
  // towinTiger: Number,
  // towinGoat: Number,
  // gameOver: Boolean,
  // winner: String,