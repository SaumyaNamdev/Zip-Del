const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key'; // You should store this in environment variables

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '2h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
