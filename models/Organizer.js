const mongoose = require('mongoose');

const OrganizerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
  organizationID: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,  // Organizer is not verified by default
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Organizer', OrganizerSchema);
