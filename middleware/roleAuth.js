import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to check if the user is authenticated and has the required role
export const roleAuth = (roles) => (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    if (roles.includes(req.user.role)) {
      return next();
    } else {
      return res.status(403).json({ msg: 'Access denied' });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
