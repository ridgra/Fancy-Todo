const { Todo } = require('../models');

class TodosController {
  static async create(req, res, next) {
    try {
      const { title, description, due_date, projectId } = req.body;
      await Todo.build({
        title,
        description,
        due_date,
        projectId,
      }).validate();
      const todo = await Todo.create({
        title,
        description,
        due_date,
        projectId,
      });
      res.status(201).json({ todo });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const { projectId } = req.params;
      const todo = await Todo.findAll({
        where: {
          projectId,
        },
        order: [['createdAt', 'desc']],
      });
      res.status(200).json({ todo });
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const todo = await Todo.findByPk(id);
      res.status(200).json({ todo });
    } catch (err) {
      next(err);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const todo = await Todo.update(
        {
          status,
        },
        { where: { id }, returning: true }
      );
      res.status(200).json({ todo: todo[1][0] });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, due_date } = req.body;
      const todo = await Todo.update(
        {
          title,
          description,
          due_date,
        },
        { where: { id }, returning: true }
      );
      res.status(200).json({ todo: todo[1][0] });
    } catch (err) {
      next(err);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      await Todo.destroy({ where: { id } });
      res.status(200).json({ msg: `'data has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TodosController;
