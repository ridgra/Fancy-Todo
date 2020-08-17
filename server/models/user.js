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
      User.belongsToMany(models.Project, {
        foreignKey: 'userId',
        through: 'UserProjects',
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email is required',
          },
          isEmail: {
            args: true,
            msg: 'Invalid email format',
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
