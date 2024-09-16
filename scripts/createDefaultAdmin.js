const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/AdminModel'); // Adjust the path as needed
require('dotenv').config(); // To load environment variables

// Function to create the default admin
const createDefaultAdmin = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Check if an admin with the specified email already exists
    const existingAdmin = await Admin.findOne({ email: 'lakshiga20021216@gmail.com' });

    if (!existingAdmin) {
      // Hash the default admin's password
      const hashedPassword = await bcrypt.hash('Lachchu16', 10);

      // Create a new admin object with email, hashed password, and role
      const admin = new Admin({
        email: 'lakshiga20021216@gmail.com',
        password: hashedPassword,
        role: 'admin',
      });

      // Save the new admin to the database
      await admin.save();
      console.log('Default admin created successfully.');
    } else {
      console.log('Admin user already exists.');
    }

    // Disconnect from the database after completion
    mongoose.disconnect();
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

// Call the function to create the default admin
createDefaultAdmin();
