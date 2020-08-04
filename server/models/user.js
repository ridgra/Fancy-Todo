'use strict';
const { Model } = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'email is required',
          },
          isEmail: {
            args: true,
            msg: 'invalid email format',
          },
          async function(value, next) {
            try {
              const user = await User.findOne({
                where: {
                  email: value,
                },
              });
              if (user) {
                throw 'email address already in use';
              }
              next();
            } catch (err) {
              next(err);
            }
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Password is required',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPass(user.password);
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
