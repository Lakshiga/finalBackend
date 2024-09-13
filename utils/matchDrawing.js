const Match = require('../models/Match');

function drawMatches(type, players, umpires, eventId) {
  let matches = [];

  if (type === 'Knockout') {
    // Simple knockout logic
    for (let i = 0; i < players.length; i += 2) {
      matches.push(new Match({
        name: `Match ${i/2 + 1}`,
        type: 'Knockout',
        players: [players[i], players[i + 1]],
        umpire: umpires[i/2 % umpires.length],
        event: eventId,
      }));
    }
  } else if (type === 'League') {
    // Round-robin league logic
    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        matches.push(new Match({
          name: `Match ${matches.length + 1}`,
          type: 'League',
          players: [players[i], players[j]],
          umpire: umpires[matches.length % umpires.length],
          event: eventId,
        }));
      }
    }
  }

  return matches;
}

module.exports = drawMatches;
