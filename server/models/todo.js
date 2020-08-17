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
      Todo.belongsTo(models.Project, { foreignKey: 'projectId' });
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
      projectId: DataTypes.INTEGER,
      due_date: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: { msg: 'The field data must be a date' },
          isAfter: {
            args: getYesterday(),
            msg: 'Date entered must be on or after today',
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        async beforeCreate(todo) {
          todo.status = false;
        },
      },
      modelName: 'Todo',
    }
  );
  return Todo;
};

