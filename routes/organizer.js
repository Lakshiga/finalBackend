const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const Umpire = require('../models/Umpire');
const authMiddleware = require('../middleware/authMiddleware');
const roleAuth = require('../middleware/roleAuth');

// Middleware to ensure the user is authenticated and has the 'organizer' role
router.use(authMiddleware);
router.use(roleAuth('organizer'));

// Create a new match
router.post('/matches', async (req, res) => {
    try {
        const newMatch = new Match(req.body);
        await newMatch.save();
        res.status(201).json(newMatch);
    } catch (error) {
        res.status(500).json({ message: 'Error creating match', error });
    }
});

// Update an existing match
router.put('/matches/:id', async (req, res) => {
    try {
        const updatedMatch = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMatch) {
            return res.status(404).json({ message: 'Match not found' });
        }
        res.status(200).json(updatedMatch);
    } catch (error) {
        res.status(500).json({ message: 'Error updating match', error });
    }
});

// Delete a match
router.delete('/matches/:id', async (req, res) => {
    try {
        const deletedMatch = await Match.findByIdAndDelete(req.params.id);
        if (!deletedMatch) {
            return res.status(404).json({ message: 'Match not found' });
        }
        res.status(200).json({ message: 'Match deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting match', error });
    }
});

// Get matches by organizer
router.get('/matches', async (req, res) => {
    try {
        // Assuming organizer ID is stored in req.user.id
        const matches = await Match.find({ organizer: req.user.id });
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching matches', error });
    }
});

// Get all umpires who need verification
router.get('/umpire-verifications', async (req, res) => {
    try {
        const umpires = await Umpire.find({ verificationStatus: 'Pending' });
        res.status(200).json(umpires);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching unverified umpires', error });
    }
});

// Verify an umpire
router.post('/verify-umpire/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const umpire = await Umpire.findById(id);
        if (!umpire) {
            return res.status(404).json({ message: 'Umpire not found' });
        }

        umpire.verificationStatus = 'Verified';
        await umpire.save();
        res.status(200).json({ message: 'Umpire verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying umpire', error });
    }
});

module.exports = router;
