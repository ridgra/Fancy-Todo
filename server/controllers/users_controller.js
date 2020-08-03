const { User } = require('../models');
const { comparePass } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UsersControllers {
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const findEmail = await User.findOne({ where: { email } });
      if (findEmail) throw 'Email already exists';
      const user = await User.create({
        email,
        password,
      });
      res.status(201).json({ user });
    } catch (err) {
      const msg = err.errors[0].message || err;
      res.status(500).json({ error: msg || 'internal server error' });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      const msg = 'Invalid email or password';
      if (!user) throw msg;
      const comparePassword = comparePass(password, user.password);
      if (!comparePassword) throw msg;
      const payload = {
        id: user.id,
        email: user.email,
      };
      const token = generateToken(payload);
      res.status(200).json({ token });
    } catch (err) {
      const msg = err.errors[0].message || err;
      res.status(500).json({ error: msg || 'internal server error' });
    }
  }
}

module.exports = UsersControllers;
