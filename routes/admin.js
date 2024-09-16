const express = require('express');
const router = express.Router();
const { getAllOrganizers, verifyOrganizer, getAllUmpires, getAllMatches, getMatchPerformance } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleAuth = require('../middleware/roleAuth');

// Admin routes
router.get('/organizers', authMiddleware, roleAuth('admin'), getAllOrganizers);
router.put('/organizers/:id/verify', authMiddleware, roleAuth('admin'), verifyOrganizer);
router.get('/umpires', authMiddleware, roleAuth('admin'), getAllUmpires);
router.get('/matches', authMiddleware, roleAuth('admin'), getAllMatches);
router.get('/performance', authMiddleware, roleAuth('admin'), getMatchPerformance);

module.exports = router;
