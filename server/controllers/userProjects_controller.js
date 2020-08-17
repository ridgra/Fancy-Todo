const { UserProject, User, Project } = require('../models');

class UserProjectsController {
  static async create(req, res, next) {
    try {
      const { projectId, userId } = req.body;
      const userProjects = await UserProject.create({ projectId, userId });
      res.status(201).json({ userProjects });
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { projectId, userId } = req.query;
      const userProjects = await UserProject.findOne({
        where: { projectId, userId },
      });
      res.status(201).json({ userProjects });
    } catch (err) {
      next(err);
    }
  }

  static async findAllEmail(req, res, next) {
    try {
      const { id } = req.params;
      const data = await User.findAll({
        include: [
          {
            model: Project,
            where: {id},
            through: {
              where: {
                projectId: id,
              },
            },
          },
        ],
      });
      const email = data.map((e) => e.email);
      res.status(201).json(email);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserProjectsController;
