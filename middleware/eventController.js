const Event = require('../models/Event');
const Match = require('../models/Match');
const drawMatches = require('../utils/matchDrawing');

exports.createEvent = async (req, res) => {
  const { name, matchType, players, umpires } = req.body;

  try {
    const event = new Event({
      name,
      organizer: req.user.id,
      matchType,
      players,
      umpires,
    });

    await event.save();

    // Drawing matches
    const matches = drawMatches(matchType, players, umpires, event._id);
    event.matches = matches.map(match => match._id);

    await event.save();
    await Match.insertMany(matches);

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
