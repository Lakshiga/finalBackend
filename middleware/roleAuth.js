const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to check if the user is authenticated and has the required role
const roleAuth = (roles) => {
  return (req, res, next) => {
    // Get token from headers
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;

      // Check if user has the required role
      if (roles.includes(req.user.role)) {
        next();
      } else {
        res.status(403).json({ msg: 'Access denied' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};

module.exports = roleAuth;
