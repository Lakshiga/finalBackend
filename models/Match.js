const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  players: [{ type: String, required: true }],
  score: { type: Map, of: String }, // Storing score as a map (e.g., { player1: '3', player2: '2' })
  umpire: { type: String },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Match', MatchSchema);
