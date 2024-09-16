const Match = require('../models/Match');
const Umpire = require('../models/Umpire');

// Create a new match
exports.createMatch = async (req, res) => {
  try {
    const match = new Match({
      ...req.body,
      organizer: req.user.id  // Assume req.user contains authenticated user info
    });
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update an existing match
exports.updateMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }
    res.json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a match
exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }
    res.json({ msg: 'Match deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Verify an umpire
exports.verifyUmpire = async (req, res) => {
  try {
    const umpire = await Umpire.findById(req.params.id);
    if (!umpire) {
      return res.status(404).json({ msg: 'Umpire not found' });
    }
    umpire.verified = true;
    await umpire.save();
    res.json({ msg: 'Umpire verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get matches by organizer
exports.getMatchesByOrganizer = async (req, res) => {
  try {
    const matches = await Match.find({ organizer: req.user.id });
    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
