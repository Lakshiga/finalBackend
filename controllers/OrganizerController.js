const Match = require('../models/Match');
const User = require('../models/User'); // Assuming User model is used for umpires
const Umpire = require('../models/Umpire');

// Create a new match
exports.createMatch = async (req, res) => {
  try {
    const match = new Match({
      ...req.body,
      organizer: req.user.id  // Ensure req.user contains authenticated user info
    });
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing match
exports.updateMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }
    if (match.organizer.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    Object.assign(match, req.body); // Update match with new details
    await match.save();
    res.json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a match
exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }
    if (match.organizer.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    await match.remove();
    res.json({ msg: 'Match removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Verify an umpire
exports.verifyUmpire = async (req, res) => {
  try {
    const umpire = await User.findById(req.params.id);
    if (!umpire) {
      return res.status(404).json({ msg: 'Umpire not found' });
    }
    umpire.verified = true;
    await umpire.save();
    res.json({ msg: 'Umpire verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get matches by organizer
exports.getMatchesByOrganizer = async (req, res) => {
  try {
    const matches = await Match.find({ organizer: req.user.id });
    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
