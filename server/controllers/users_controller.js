const { User } = require('../models');
const { comparePass } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

class UsersControllers {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      await User.build({ email, password }).validate();
      const checkEmail = await User.findOne({
        where: {
          email,
        },
      });
      if (checkEmail) throw { msg: 'Email address already in use' };
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
      await User.build({ email, password }).validate();
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

  static async googleSignIn(req, res, next) {
    try {
      const idToken = req.body.idtoken;
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.CLIENT_ID,
      });
      const ticketPayload = ticket.getPayload();
      const user = await User.findOne({
        where: { email: ticketPayload.email },
      });
      let payload = null;
      if (user) {
        payload = {
          id: user.id,
          email: user.email,
        };
      } else {
        const newUser = await User.create({
          email: ticketPayload.email,
          password: 'fancytodowithgooglesign!',
        });
        payload = {
          id: newUser.id,
          email: newUser.email,
        };
      }
      const token = generateToken(payload);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      res.status(200).json({ user: !user ? false : user.dataValues.id });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UsersControllers;
