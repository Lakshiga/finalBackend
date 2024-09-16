const Organizer = require('../models/Organizer');
const Umpire = require('../models/Umpire');
const Match = require('../models/Match');

// Admin can view all organizers
exports.getAllOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find();
    res.json(organizers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin can verify an organizer's registration
exports.verifyOrganizer = async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id);
    if (!organizer) {
      return res.status(404).json({ msg: 'Organizer not found' });
    }
    organizer.verified = true;
    await organizer.save();
    res.json({ msg: 'Organizer verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin can view all umpires
exports.getAllUmpires = async (req, res) => {
  try {
    const umpires = await Umpire.find();
    res.json(umpires);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin can view all matches
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin can view overall match performance (e.g., statistics)
exports.getMatchPerformance = async (req, res) => {
  try {
    // Example query to get match performance data
    const matches = await Match.aggregate([
      {
        $group: {
          _id: '$status',
          totalMatches: { $sum: 1 },
          // Additional performance metrics can be added here
        }
      }
    ]);
    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
