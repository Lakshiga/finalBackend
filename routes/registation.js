const express = require('express');
const bcrypt = require('bcryptjs');  // Ensure passwords are hashed
const jwt = require('jsonwebtoken');
const router = express.Router();
const Organizer = require('../models/Organizer');
const Umpire = require('../models/Umpire');

// Register Organizer
router.post('/register/organizer', async (req, res) => {
    const { name, email, password, organizationName, organizationId, contactNumber } = req.body;

    try {
        // Check if the organizer already exists
        let organizer = await Organizer.findOne({ email });
        if (organizer) {
            return res.status(400).json({ message: 'Organizer already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newOrganizer = new Organizer({
            name,
            email,
            password: hashedPassword,  // Store the hashed password
            organizationName,
            organizationId,
            contactNumber,
            verificationStatus: 'Pending'
        });

        await newOrganizer.save();

        // Return a success message after registration
        res.status(201).json({ message: 'Organizer registered successfully. Pending verification.' });
    } catch (error) {
        console.error('Error registering organizer:', error.message);
        res.status(500).json({ message: 'Error registering organizer', error });
    }
});

// Register Umpire
router.post('/register/umpire', async (req, res) => {
    const { name, email, password, contactNumber, certificationLevel } = req.body;

    try {
        // Check if the umpire already exists
        let umpire = await Umpire.findOne({ email });
        if (umpire) {
            return res.status(400).json({ message: 'Umpire already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUmpire = new Umpire({
            name,
            email,
            password: hashedPassword,  // Store the hashed password
            contactNumber,
            certificationLevel,
            verificationStatus: 'Pending'
        });

        await newUmpire.save();

        // Return a success message after registration
        res.status(201).json({ message: 'Umpire registered successfully. Pending verification.' });
    } catch (error) {
        console.error('Error registering umpire:', error.message);
        res.status(500).json({ message: 'Error registering umpire', error });
    }
});

module.exports = router;
