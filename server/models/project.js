'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.hasMany(models.Todo);
      Project.belongsTo(models.User);
    }
  }
  Project.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Project\'s title is required' },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Project\'s description is required' },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};
