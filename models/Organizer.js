import mongoose from 'mongoose';

const { Schema } = mongoose;

const OrganizerSchema = new Schema({
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

const Organizer = mongoose.model('Organizer', OrganizerSchema);
export default Organizer; // Use default export
