'use strict';
const { Model } = require('sequelize');
const { options } = require('../routes');
const Sequelize = require('Sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      due_date: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          notEmpty: true,
          isAfter: new Date().toISOString(),
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (todo) => {
          todo.status = false;
        },
      },
      modelName: 'Todo',
    }
  );
  return Todo;
};
