import User from '../models/User.js';

// Fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // Fetch all users
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Verify user by ID
export const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isVerified = true;
    await user.save();
    res.json({ message: 'User verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying user', error: error.message });
  }
};
