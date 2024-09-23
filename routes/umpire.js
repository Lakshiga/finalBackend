import express from 'express';
import Match from '../models/Match.js'; // Assuming you have a Match model
import { verifyToken as authMiddleware } from '../middleware/authMiddleware.js';
import { roleAuth } from '../middleware/roleAuth.js';

const router = express.Router();

// Route for umpire to update match scores
router.put('/:matchId/score', authMiddleware, roleAuth('umpire'), async (req, res) => {
  const { player1Score, player2Score } = req.body;

  try {
    const match = await Match.findById(req.params.matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    // Ensure that the umpire is authorized to update this match's score
    if (!match.umpire.equals(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized to update scores for this match' });
    }

    // Update match scores
    match.player1Score = player1Score;
    match.player2Score = player2Score;
    match.status = 'completed'; // Mark match as completed when scores are updated

    await match.save();
    res.status(200).json({ message: 'Score updated successfully', match });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error updating score', error: err.message });
  }
});

// Route for umpire to view match details they are responsible for
router.get('/matches', authMiddleware, roleAuth('umpire'), async (req, res) => {
  try {
    const matches = await Match.find({ umpire: req.user.id });
    res.status(200).json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error fetching matches', error: err.message });
  }
});

export default router;
