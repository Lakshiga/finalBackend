const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, contactNumber, organizationName, organizationId, certificationLevel } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Set verified to false for organizers
      user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        contactNumber: role === 'Organizer' || role === 'Umpire' ? contactNumber : undefined,
        organizationName: role === 'Organizer' ? organizationName : undefined,
        organizationId: role === 'Organizer' ? organizationId : undefined,
        certificationLevel: role === 'Umpire' ? certificationLevel : undefined,
        verified: role === 'Organizer' ? false : true,  // Set verified to false for Organizer
      });

      await user.save();

      res.status(201).json({
        msg: role === 'Organizer'
          ? 'Organizer registration successful. Please wait for admin verification.'
          : 'User registered successfully!',
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Admin default credentials check
      const defaultAdminEmail = 'lakshiga20021216@gmail.com';
      const defaultAdminPassword = 'Lachchu16';

      if (email === defaultAdminEmail && password === defaultAdminPassword) {
        const token = jwt.sign(
          { user: { id: 'admin', role: 'admin' } },
          process.env.JWT_SECRET,
          { expiresIn: '5h' }
        );
        return res.json({ token, role: 'admin', msg: 'Login successful as Admin' });
      }

      // Check if the user exists in the database
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token, role: user.role, msg: 'Login successful' });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
