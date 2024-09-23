import Organizer from '../models/Organizer.js';
import Umpire from '../models/Umpire.js';
import Match from '../models/Match.js';

// Admin can view all organizers
export const getAllOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find();
    res.json(organizers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin can verify an organizer's registration
export const verifyOrganizer = async (req, res) => {
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
export const getAllUmpires = async (req, res) => {
  try {
    const umpires = await Umpire.find();
    res.json(umpires);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin can view all matches
export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin can view overall match performance (e.g., statistics)
export const getMatchPerformance = async (req, res) => {
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
