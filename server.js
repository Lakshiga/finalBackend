require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db'); // Importing the db connection
const userRoutes = require('./routes/auth'); // Importing user authentication routes
const matchRoutes = require('./routes/matches'); // Importing match routes
const eventRoutes = require('./routes/events');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/users', userRoutes); // API route for user-related operations
app.use('/api/matches', matchRoutes); // API route for match-related operations
app.use('/api/events', eventRoutes); // New event routes

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
