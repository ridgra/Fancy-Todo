const { Project } = require('../models');

class ProjectsController {
  static async create(req, res, next) {
    try {
      const { title, description } = req.body;
      const project = await Project.create({
        title,
        description,
        UserId: req.userData.id,
      });
      res.status(201).json({ project });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const project = await Project.findAll({
        where: {
          UserId: req.userData.id,
        },
      });
      res.status(200).json({ project });
    } catch (err) {
      console.log(err);
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
          // UserId: req.userData.id,
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
      await Project.destroy({ where: { id } });
      res.status(200).json({ msg: `data has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProjectsController;
