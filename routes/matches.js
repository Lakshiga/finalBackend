const express = require('express');
const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');
const Match = require('../models/Match');
const router = express.Router();

// Create match (Organizer only)
router.post('/match', auth, checkRole('Organizer'), async (req, res) => {
  const { name, type, players } = req.body;

  // Validate required fields
  if (!name || !type || !players) {
    return res.status(400).json({ msg: 'Please fill out all fields.' });
  }

  try {
    const match = new Match({ name, type, players });
    await match.save();
    res.status(201).json({ msg: 'Match created successfully', match });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update score (Umpire only)
router.put('/match/:id/score', auth, checkRole('Umpire'), async (req, res) => {
  const { score } = req.body;
  try {
    let match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }
    match.score = score;
    await match.save();
    res.json(match);
  } catch (err) {
    console.error('Error updating score:', err.message);
    res.status(500).send('Server error');
  }
});

// View match (All roles)
router.get('/match/:id', auth, async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }
    res.json(match);
  } catch (err) {
    console.error('Error viewing match:', err.message);
    res.status(500).send('Server error');
  }
});

// List all matches (All roles)
router.get('/matches', auth, async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (err) {
    console.error('Error listing matches:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
