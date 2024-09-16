const express = require('express');
const router = express.Router();
const {
  createMatch,
  updateMatch,
  deleteMatch,
  verifyUmpire,
  getMatchesByOrganizer,
} = require('../controllers/organizerController');
const authMiddleware = require('../middleware/authMiddleware');
const roleAuth = require('../middleware/roleAuth');

// Middleware to ensure the user is authenticated and has the 'organizer' role
router.use(authMiddleware);
router.use(roleAuth('organizer'));

// Create a new match
router.post('/matches', createMatch);

// Update an existing match
router.put('/matches/:id', updateMatch);

// Delete a match
router.delete('/matches/:id', deleteMatch);

// Verify an umpire
router.put('/umpires/:id/verify', verifyUmpire);

// Get matches by organizer
router.get('/matches', getMatchesByOrganizer);

module.exports = router;
