const { User } = require('../models');
const { comparePass } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UsersControllers {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.create({
        email,
        password,
      });
      res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  }
  
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      const msg = { msg: 'Invalid email or password' };
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
      next(err);
    }
  }
}

module.exports = UsersControllers;
