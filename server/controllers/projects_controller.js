const { Project, UserProject, User } = require('../models');
const userproject = require('../models/userproject');

class ProjectsController {
  static async create(req, res, next) {
    try {
      const { title, description } = req.body;
      const project = await Project.create({
        title,
        description,
        userId: req.userData.id,
      });
      res.status(201).json({ project });
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const project = await Project.findOne({
        where: {
          id,
        },
      });
      res.status(200).json({ project });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const project = await Project.findAll({
        include: {
          model: User,
          where: {
            id: req.userData.id,
          },
        },
        order: [['createdAt', 'desc']],
      });
      res.status(200).json({ project });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const project = await Project.update(
        {
          title,
          description,
          // userId: req.userData.id,
        },
        { where: { id }, returning: true }
      );
      res.status(200).json({ project: project[1][0] });
    } catch (err) {
      next(err);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const find = await Project.findByPk(id);
      if (!find) throw { msg: 'Data not found' };
      await Project.destroy(
        {
          where: { id },
        },
        { returning: true }
      );
      res.status(200).json({
        project: {
          title: find.dataValues.title,
          msg: 'deleted',
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProjectsController;
