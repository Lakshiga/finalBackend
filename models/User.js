import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  contactNumber: { type: String },
  organizationName: { type: String },
  organizationId: { type: String },
  certificationLevel: { type: String },
  verified: { type: Boolean, default: false },
});

const User = mongoose.model('User', UserSchema);

export default User; // Ensure this line is present
