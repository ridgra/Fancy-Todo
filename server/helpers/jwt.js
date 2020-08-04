const jwt = require('jsonwebtoken');

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
}

module.exports = { generateToken, verifyToken };