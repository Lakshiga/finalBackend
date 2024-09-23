// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Match = require('../models/Match');
// const authMiddleware = require('../middleware/authMiddleware');
// const roleAuth = require('../middleware/roleAuth');

// // Admin Route: Get all unverified organizers
// router.get('/unverified-organizers', authMiddleware, roleAuth('admin'), async (req, res) => {
//   try {
//     const organizers = await User.find({ role: 'organizer', verified: false });
//     res.status(200).json(organizers);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Error fetching unverified organizers', error: err.message });
//   }
// });

// // Admin Route: Verify an organizer
// router.put('/organizers/:id/verify', authMiddleware, roleAuth('admin'), async (req, res) => {
//   try {
//     const organizer = await User.findById(req.params.id);
//     if (!organizer || organizer.role !== 'organizer') {
//       return res.status(404).json({ message: 'Organizer not found' });
//     }

//     organizer.verified = true;
//     await organizer.save();
//     res.status(200).json({ message: 'Organizer verified successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Error verifying organizer', error: err.message });
//   }
// });

// // Admin Route: Get all matches
// router.get('/matches', authMiddleware, roleAuth('admin'), async (req, res) => {
//   try {
//     const matches = await Match.find();
//     res.status(200).json(matches);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Error fetching matches', error: err.message });
//   }
// });

// // Admin Route: Get performance data (Add your performance logic)
// router.get('/performance', authMiddleware, roleAuth('admin'), async (req, res) => {
//   try {
//     // Example performance data logic
//     // Replace with actual logic for performance data
//     const performanceData = {
//       totalMatches: await Match.countDocuments(),
//       totalOrganizers: await User.countDocuments({ role: 'organizer' }),
//       totalUmpires: await User.countDocuments({ role: 'umpire' }),
//       // Add more performance-related data here
//     };

//     res.status(200).json(performanceData);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Error fetching performance data', error: err.message });
//   }
// });

import express from 'express';
import { getAllOrganizers, verifyOrganizer, getAllUmpires, getAllMatches, getMatchPerformance } from '../controllers/adminController.js';

const router = express.Router();

// Admin routes for organizers
router.get('/organizers', getAllOrganizers); 
router.put('/organizers/:id/verify', verifyOrganizer); // Changed POST to PUT

// Admin routes for umpires and matches
router.get('/umpires', getAllUmpires);
router.get('/matches', getAllMatches);
router.get('/match-performance', getMatchPerformance);

export default router;
