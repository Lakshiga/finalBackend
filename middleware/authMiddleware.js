const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');

  console.log('Authorization Header:', authHeader);

  // Check if no token
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extract token from header
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

  console.log('Extracted Token:', token);

  // Check if token doesn't exist
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    console.log('Decoded Token:', decoded);

    // Check if the user role is admin
    if (decoded.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    // Attach the decoded user to the request
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
