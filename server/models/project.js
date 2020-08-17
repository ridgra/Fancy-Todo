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
      Project.belongsToMany(models.User, {
        foreignKey: 'projectId',
        through: 'UserProjects',
      });
      
    }
  }
  Project.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Project's title is required" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Project's description is required" },
        },
      },
      userId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeBulkDestroy: async (instance) => {
          try {
            sequelize.models.Todo.destroy({
              where: { projectId: instance.where.id },
            });
          } catch (err) {
          }
        },
        afterCreate: async (instance) => {
          try {
            sequelize.models.UserProject.create({
              projectId: instance.id,
              userId: instance.userId,
            });
          } catch (err) {
          }
        },
      },
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};
