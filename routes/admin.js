const express = require('express');
const router = express.Router();
const { getAllOrganizers, verifyOrganizer, getAllUmpires, getAllMatches, getMatchPerformance } = require('/home/uki-admin02/Documents/Lachchu/Match Lachchu final/Match Lachchu/Match /Backend/controllers/adminController.js');
const authMiddleware = require('../middleware/authMiddleware');
const roleAuth = require('../middleware/roleAuth');

// Admin routes
router.get('/organizers', authMiddleware, async (req, res) => {
    try {
      const organizers = await Organizer.find(); // Fetch all organizers from the database
      res.json(organizers); // Send the list of organizers back
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
router.put('/organizers/:id/verify', authMiddleware, roleAuth('admin'), verifyOrganizer);
router.get('/umpires', authMiddleware, roleAuth('admin'), getAllUmpires);
router.get('/matches', authMiddleware, roleAuth('admin'), getAllMatches);
router.get('/performance', authMiddleware, roleAuth('admin'), getMatchPerformance);

module.exports = router;
