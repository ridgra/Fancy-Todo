const jwt = require('jsonwebtoken');

function generateToken(payload) {
  return jwt.sign(payload, 'secret');
}

module.exports = { generateToken };
