const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  player1: {
    type: String,
    required: true,
  },
  player2: {
    type: String,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the organizer
    required: true,
  },
  umpire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the umpire
    required: true,
  },
  score: {
    player1Score: {
      type: Number,
      default: 0,
    },
    player2Score: {
      type: Number,
      default: 0,
    },
  },
  status: {
    type: String,
    enum: ['Pending', 'Ongoing', 'Finished'],
    default: 'Pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Match', MatchSchema);
