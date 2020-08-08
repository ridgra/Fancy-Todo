'use strict';
const { Model } = require('sequelize');
const { getYesterday } = require('../helpers/functions');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User);
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Title is required' },
        },
      },
      description: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      due_date: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: { msg: 'The field data must be a date' },
          notEmpty: { msg: 'Title is required' },
          isAfter: {
            args: getYesterday(),
            msg: 'Date entered must be on or after today',
          },
        },
      },
      ProjectId: DataTypes.INTEGER,
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
