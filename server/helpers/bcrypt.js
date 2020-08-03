const bcrypt = require('bcryptjs');

function hashPass(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function comparePass(password, hashPass) {
  return bcrypt.compareSync(password, hashPass);
}

module.exports = { hashPass, comparePass };
